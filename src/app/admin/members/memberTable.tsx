"use client";

import React, { useEffect, useState } from "react";
import { Membership, columns } from "@/components/Tables/membership/columns";
import { DataTable } from "@/components/Tables/membership/data_table";
import { StatCardProps, StatCard } from "@/components/StatCard/statCard";

export default function MemberTable() {
	const [data, setData] = useState<Membership[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [cards, setCards] = useState<StatCardProps[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/members", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}

				const members = await response.json();
				const filteredMembers = members.filter(
					(member: any) =>
						member.membership_request_status === "active" ||
						member.membership_request_status === "pending"
				);

				const formattedData = filteredMembers.map((member: any) => ({
					id: member._id,
					name: member.name,
					email: member.email,
					phone: member.phoneNumber,
					role: member.role,
					status: member.status,
					student_no: member.studentNumber,
					date_of_joining: new Date(),
					membership_request_status: member.membership_request_status,
					image: member.profileImage || "/images/logo/logo.png",
					department: member.department,
				}));

				setData(formattedData);
				setLoading(false);
			} catch (error) {
				setError("Failed to fetch members");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// This useEffect will run whenever `data` changes and update `cards` accordingly
	useEffect(() => {
		const cardData: StatCardProps[] = [
			{
				icon: "tdesign:member",
				color: "#3FD97F",
				title: "Total Members",
				value: data
					.filter(
						(member: { membership_request_status: string }) =>
							member.membership_request_status !== "not_accepted"
					)
					.length.toString(),

				growthRate: 0,
			},
			{
				icon: "mdi:account-online-outline",
				color: "#3FD97F",
				title: "Active Members",
				value: data
					.filter((member) => member.status === "active")
					.length.toString(),
				growthRate: data.filter((member) => member.status === "active").length,
			},
			{
				icon: "mdi:account-pending-outline",
				color: "#3FD97F",
				title: "Pending Members",
				value: data
					.filter((member) => member.membership_request_status === "pending")
					.length.toString(),
				growthRate: data.filter(
					(member) => member.membership_request_status === "pending"
				).length,
			},
		];

		setCards(cardData);
	}, [data]); // Re-run whenever `data` changes

	const handleStatusChange = async (
		updatedItem: any,
		newStatus: "Joined" | "Pending" | "Remove"
	) => {
		console.log("Updated", updatedItem);
		console.log("New Status", newStatus);

		// Modify the updatedItem based on the new status
		if (newStatus === "Joined") {
			updatedItem.membership_request_status = "active"; // Update status
			updatedItem.date_of_joining = new Date(); // Set the join date
			updatedItem.role = "member"; // Update the role
		} else if (newStatus === "Remove") {
			updatedItem.membership_request_status = "not_accepted"; // Update status
			updatedItem.role = "user";
			// Update role to 'user'
		}

		try {
			const response = await fetch(`/api/members/${updatedItem.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedItem), // Send updated item with new status
			});

			if (!response.ok) {
				throw new Error(`Failed to update status: ${response.status}`);
			}

			// Successfully updated, get the updated member data
			const updatedMember = await response.json();

			//Update the local state to reflect the updated member info
			setData((prevData) =>
				prevData.map((member) =>
					(member.membership_request_status === "active" ||
						member.membership_request_status === "pending") &&
					member.membership_request_status ===
						updatedMember.membership_request_status
						? updatedItem
						: member
				)
			);

			console.log(data);
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const handleAddMember = async (addMember: any) => {
		console.log("added member", addMember);

		// Update member's status and role before sending to the API
		addMember.membership_request_status = "active"; // Update status
		addMember.date_of_joining = new Date(); // Set the join date
		addMember.role = "member"; // Update the role

		try {
			const response = await fetch(`/api/members/${addMember._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(addMember), // Send updated item with new status
			});

			if (!response.ok) {
				throw new Error(`Failed to update status: ${response.status}`);
			}

			// Successfully updated, get the updated member data
			const updatedMember = await response.json();
			(updatedMember.image = addMember.image || "/images/logo/logo.png"),
				(updatedMember.date_of_joining = new Date(
					updatedMember.date_of_joining
				));
			// Add the updated member to the local state
			setData((prevData) => {
				// Find and remove the old version of the member, if it exists
				const updatedData = prevData.filter(
					(member) => member.id !== updatedMember._id
				);
				// Add the updated member to the data
				return [...prevData, updatedMember];
			});
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	const handleRemoveMember = async (id: string) => {
		try {
			const response = await fetch(`/api/members/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setData(data.filter((member) => member.id !== id)); // Update data without the removed member
			} else {
				console.error("Failed to delete member");
			}
		} catch (error) {
			console.error("Error deleting member:", error);
		}
	};

	return (
		<div className="container mx-auto">
			<h4 className="font-semibold text-xl mb-4">Maintenance Club Members</h4>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7.5">
				{cards.map((card, index) => (
					<StatCard
						key={index}
						icon={card.icon}
						color={card.color}
						title={card.title}
						value={card.value}
						growthRate={card.growthRate}
					/>
				))}
			</div>

			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}
			<div className="bg-white mt-8 p-4 rounded-lg">
				<DataTable
					columns={columns}
					data={data.filter(
						(member: { membership_request_status: string }) =>
							member.membership_request_status !== "not_accepted"
					)}
					onRemoveMember={handleRemoveMember}
					onStatusChange={handleStatusChange}
					onAddMember={handleAddMember}
				/>
			</div>
		</div>
	);
}
