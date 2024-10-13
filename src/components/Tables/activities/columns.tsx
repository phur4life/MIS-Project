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

export type ActivitiesTable = {
	id: string;
	userName: string;
	Room_No: string;
	Request_type: string[];
	date: Date;
	status: "Pending" | "In-Progress" | "Verifying" | "Completed";
};

export const columns: ColumnDef<ActivitiesTable>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "userName",
		header: "Name",
	},
	{
		accessorKey: "Room_No",
		header: "Room No",
	},
	{
		accessorKey: "Request_type",
		header: "Request Type",
		cell: ({ row }) => (
			<div className="flex gap-2 justify-center">
				{row.original.Request_type.map((type, index) => (
					<Button key={index} variant="outline">
						{type}
					</Button>
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
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>{row.original.status}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" style={{ backgroundColor: "white" }}>
						<DropdownMenuItem className="hover:bg-gray-300">
							Take Quest
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:bg-gray-300">
							Verify
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:bg-gray-300">
							Completed
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
	},
];
