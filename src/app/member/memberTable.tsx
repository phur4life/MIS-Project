import { Membership, columns } from "@/components/Tables/membership/columns";
import { DataTable } from "@/components/Tables/membership/data_table";

async function getData(): Promise<Membership[]> {
	// Fetch data from your API here.
	return [
		{
			name: "Alice Johnson",
			email: "alice.johnson@example.com",
			phone: "123-456-7890",
			student_no: "S12345",
			date_of_joining: new Date("2023-01-15"),
			joined: "Joined",
			image: "https://via.placeholder.com/150",
			department: "Computer Science",
		},
		{
			name: "Bob Smith",
			email: "bob.smith@example.com",
			phone: "987-654-3210",
			student_no: "S67890",
			date_of_joining: new Date("2024-09-10"),
			joined: "Pending",
			image: "https://via.placeholder.com/150",
			department: "Mechanical Engineering",
		},
		{
			name: "Clara Davis",
			email: "clara.davis@example.com",
			phone: "555-123-4567",
			student_no: "S11111",
			date_of_joining: new Date("2022-07-20"),
			joined: "Joined",
			image: "https://via.placeholder.com/150",
			department: "Physics",
		},
		{
			name: "David Green",
			email: "david.green@example.com",
			phone: "444-555-6666",
			student_no: "S22222",
			date_of_joining: new Date("2021-05-05"),
			joined: "Joined",
			image: "https://via.placeholder.com/150",
			department: "Electrical Engineering",
		},
		{
			name: "Emily White",
			email: "emily.white@example.com",
			phone: "333-444-5555",
			student_no: "S33333",
			date_of_joining: new Date("2024-10-01"),
			joined: "Pending",
			image: "https://via.placeholder.com/150",
			department: "Business Administration",
		},
		// ...
	];
}

export default async function MemberTable() {
	const data = await getData();

	return (
		<div className="container mx-auto">
			<h4 className="font-semibold text-xl">Maintenance Club Members</h4>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
