import {
	ActivitiesTable,
	columns,
} from "@/components/Tables/activities/columns";
import { DataTable } from "@/components/Tables/activities/data_table";

interface RequestType {
	serviceId: string;
	description: string;
	phoneNumber: string;
	blockNumber: string;
	roomNumber: string;
	inventoryId: string;
}

async function getData(): Promise<ActivitiesTable[]> {
	// Fetch data from your API here.
	return [
		{
			id: "REQ001",
			userName: "Alice Johnson",
			Room_No: "101A",
			Request_type: ["Electrical", "Maintenance"],
			date: new Date("2024-10-10"),
			status: "Pending",
		},
		{
			id: "REQ002",
			userName: "Bob Smith",
			Room_No: "102B",
			Request_type: ["Housekeeping"],
			date: new Date("2024-09-15"),
			status: "In-Progress",
		},
		{
			id: "REQ003",
			userName: "Clara Davis",
			Room_No: "103C",
			Request_type: ["IT Support", "Furniture Repair"],
			date: new Date("2024-10-12"),
			status: "Verifying",
		},
		{
			id: "REQ004",
			userName: "David Green",
			Room_No: "104D",
			Request_type: ["Electrical"],
			date: new Date("2024-08-25"),
			status: "Completed",
		},
		{
			id: "REQ005",
			userName: "Emily White",
			Room_No: "105E",
			Request_type: ["Plumbing", "Maintenance"],
			date: new Date("2024-10-11"),
			status: "In-Progress",
		},
	];
}

export default async function ActivityList() {
	const data = await getData();

	return (
		<div className="container mx-auto">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
