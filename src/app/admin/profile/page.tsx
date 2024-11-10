"use client";

import BackgroundPicture from "@/components/Profile/BackgroundPicture";
import ProfessionalDetailsCard from "@/components/Profile/ProfessionalDetailsCard";
import ProfileCard from "@/components/Profile/ProfileCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { IoArrowBackCircleSharp } from "react-icons/io5";

interface User {
	id: string;
	name: string;
	email: string;
	studentNumber: string;
	profileImage: string;
	phoneNumber: string;
	room: string;
	gender: string;
	department: string;
	currentYear: string;
	role: string;
}

const aboutData = {
	additionalInfo:
		"I love exploring new technologies and sharing knowledge with others.",
};

const page = () => {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const session = await getSession();
				if (!session?.user) {
					router.push("/");
				} else {
					setUser(session.user as User);
				}
			} catch (error) {
				console.error("Failed to fetch session:", error);
			}
		};
		fetchSession();
	}, [router]);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user?.email) {
				try {
					const response = await fetch(
						`http://localhost:3000/api/profile/${user.email}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					if (response.ok) {
						const data = await response.json();
						setProfile(data); // Set the profile data if response is successful
					} else {
						console.error("Failed to fetch user profile");
					}
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};

		if (user?.email) {
			fetchUserData(); // Fetch profile only if user.email is available
		}
	}, [user]);

	const handleProfileEdit = async (updatedData: User) => {
		try {
			const response = await fetch(`/api/users/${updatedData._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedData),
			});

			if (response.ok) {
				console.log("UPDATED", response.json());
			}
		} catch (err) {
			console.log("Update Failed: ", err);
		}
		// console.log(updatedData);
	};

	return (
		<div className="bg-background m-0 relative min-h-screen">
			{/* Background picture */}
			<BackgroundPicture />

			{/* Back button with styling */}
			<div className="absolute top-4 left-4">
				<Link
					href="/admin/dashboard"
					className="text-gray-700 hover:text-gray-900"
				>
					<IoArrowBackCircleSharp
						size={36}
						className="transition duration-200 transform hover:scale-110"
					/>
				</Link>
			</div>

			{/* Centered content with slight overlap */}
			<div className="flex justify-center items-center relative">
				<div
					className={`flex ${
						profile?.role === "user"
							? "justify-center bg-transparent"
							: "justify-between bg-white"
					} flex-col w-4/5 md:flex-row gap-6 p-6 bg-opacity-90 shadow-lg min-h-[70vh] -mt-20 z-10 rounded-lg mx-auto`}
				>
					{profile ? (
						<ProfileCard user={profile} onSaveEdit={handleProfileEdit} />
					) : (
						<p className="text-gray-500 text-center w-full">Loading...</p>
					)}
					{profile?.role !== "user" && <ProfessionalDetailsCard />}
				</div>
			</div>
		</div>
	);
};

export default page;
