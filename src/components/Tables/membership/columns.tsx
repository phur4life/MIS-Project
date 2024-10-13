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
	name: string;
	email: string;
	phone: string;
	student_no: string;
	date_of_joining: Date;
	joined: "Joined" | "Pending";
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
		cell: ({ row }) => <span>{formatDate(row.original.date_of_joining)}</span>,
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
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							{row.original.joined === "Joined" ? "Member" : "Pending"}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" style={{ backgroundColor: "white" }}>
						{row.original.joined === "Joined" ? (
							<>
								<DropdownMenuItem
									onClick={() => alert(`Promote ${row.original.name}`)}
								>
									Promote
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => alert(`Remove ${row.original.name}`)}
								>
									Remove
								</DropdownMenuItem>
							</>
						) : (
							<>
								<DropdownMenuItem
									onClick={() => alert(`Accept ${row.original.name}`)}
								>
									Accept
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => alert(`Remove ${row.original.name}`)}
								>
									Remove
								</DropdownMenuItem>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
	},
];
