import { Schedule, columns } from "@/components/Tables/schedule/columns";
import { DataTable } from "@/components/Tables/schedule/data_table";

async function getData(): Promise<Schedule[]> {
	// Fetch data from your API here.
	return [
		{
			team_id: "T001",
			members: [
				{
					id: "M001",
					username: "Alice Johnson",
					image_url: "https://via.placeholder.com/150",
				},
				{
					id: "M002",
					username: "Bob Smith",
					image_url: "https://via.placeholder.com/150",
				},
			],
			date: new Date("2024-10-15"),
			activity: ["Team Meeting", "Presentation"],
			status: "Active",
		},
		{
			team_id: "T002",
			members: [
				{
					id: "M003",
					username: "Clara Davis",
					image_url: "https://via.placeholder.com/150",
				},
				{
					id: "M004",
					username: "David Green",
					image_url: "https://via.placeholder.com/150",
				},
				{
					id: "M005",
					username: "Emily White",
					image_url: "https://via.placeholder.com/150",
				},
			],
			date: new Date("2024-10-16"),
			activity: ["Workshop", "Project Discussion"],
			status: "Inactive",
		},
		{
			team_id: "T003",
			members: [
				{
					id: "M001",
					username: "Alice Johnson",
					image_url: "https://via.placeholder.com/150",
				},
				{
					id: "M003",
					username: "Clara Davis",
					image_url: "https://via.placeholder.com/150",
				},
			],
			date: new Date("2024-10-17"),
			activity: ["Training", "Code Review"],
			status: "Active",
		},
		{
			team_id: "T004",
			members: [
				{
					id: "M004",
					username: "David Green",
					image_url: "https://via.placeholder.com/150",
				},
			],
			date: new Date("2024-10-18"),
			activity: ["Maintenance", "Planning"],
			status: "Inactive",
		},
		{
			team_id: "T005",
			members: [
				{
					id: "M002",
					username: "Bob Smith",
					image_url: "https://via.placeholder.com/150",
				},
				{
					id: "M005",
					username: "Emily White",
					image_url: "https://via.placeholder.com/150",
				},
			],
			date: new Date("2024-10-19"),
			activity: ["Hackathon", "Demo Session"],
			status: "Active",
		},
	];
}

export default async function SchedudleTable() {
	const data = await getData();

	return (
		<div className="container mx-auto">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
