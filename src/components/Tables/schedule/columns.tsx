"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../lib/utils";
import { ArrowUpDown } from "lucide-react";

export type Member = {
	id: string;
	username: string;
	image_url: string;
};

export type Schedule = {
	team_id: string;
	members: Member[];
	date: Date;
	activity: string[];
	status: "Active" | "Inactive";
};

export const columns: ColumnDef<Schedule>[] = [
	{
		accessorKey: "members",
		header: "Member",
		cell: ({ row }) => (
			<div className="flex justify-center gap-3">
				{row.original.members.map((member, index) => (
					<div
						className="bg-gray-900 rounded-full transition-all ease-out hover:ring-yellow-400 hover:ring-2 hover:outline-offset-2 hover:outline-4"
						key={index}
					>
						<img width={40} height={40} src={member.image_url} alt="" />
					</div>
				))}
			</div>
		),
	},
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="hover:bg-gray-300 ease-in 2s"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
	},
	{
		accessorKey: "activity",
		header: "Activity",
		cell: ({ row }) => (
			<div>
				{row.original.activity.map((act, index) => (
					<Button key={index} variant="ghost">
						{act}
					</Button>
				))}
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={"outline"}
							className={
								row.original.status === "Active" ? "bg-green-700" : "bg-red-700"
							}
						>
							{row.original.status}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" style={{ backgroundColor: "white" }}>
						<DropdownMenuItem
							className="hover:bg-gray-300"
							onClick={() => {
								const newStatus =
									row.original.status === "Active" ? "Inactive" : "Active";
								// Call your function to update the status here
								console.log(
									`Change status from ${row.original.status} to ${newStatus}`
								);
								// Example: updateStatus(row.original.id, newStatus);
							}}
						>
							{row.original.status === "Active" ? "Set Inactive" : "Set Active"}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
	},
];
