"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";

export type Membership = {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	role: string;
	status: string;
	studentNumber: string;
	date_of_joining: Date;
	membership_request_status: "active" | "pending" | "not_accepted";
	image: string;
	department: string;
};

export const columns: ColumnDef<Membership>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<div className="flex items-center justify-start mr-8 ml-4 gap-4">
				<img
					src={row.original.image}
					alt={row.original.name}
					className="w-8 h-8 rounded-full"
				/>
				<span>{row.original.name}</span>
			</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "phone",
		header: "Contact",
	},
	{
		accessorKey: "student_no",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Student Id
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "department",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Department
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "date_of_joining",
		header: "Joined",
		cell: ({ row }) => (
			<span>
				{row.original.date_of_joining
					? formatDate(row.original.date_of_joining)
					: "N/A"}
			</span>
		),
	},
	{
		accessorKey: "joined",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row, table }) => (
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							{row.original.membership_request_status === "active"
								? "Member"
								: row.original.membership_request_status === "pending"
								? "Pending"
								: row.original.membership_request_status === "not_accepted"
								? "Not Accepted"
								: "Unknown Status"}
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end" style={{ backgroundColor: "white" }}>
						{row.original.membership_request_status === "active" ? (
							<>
								{/* <DropdownMenuItem
									onClick={() =>
										table.options.meta?.onStatusChange(row.original, "Joined")
									}
								>
									Promote
								</DropdownMenuItem> */}
								<DropdownMenuItem
									onClick={() =>
										table.options.meta?.onStatusChange(row.original, "Remove")
									}
								>
									Remove
								</DropdownMenuItem>
							</>
						) : row.original.membership_request_status === "pending" ? (
							<>
								<DropdownMenuItem
									onClick={() =>
										table.options.meta?.onStatusChange(row.original, "Joined")
									}
								>
									Accept
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										table.options.meta?.onStatusChange(row.original, "Remove")
									}
								>
									Remove
								</DropdownMenuItem>
							</>
						) : row.original.membership_request_status === "not_accepted" ? (
							<DropdownMenuItem disabled>No actions available</DropdownMenuItem>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
	},
];
