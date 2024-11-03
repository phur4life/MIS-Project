import {
	ActivitiesTable,
	columns,
} from "../../../components/Tables/activities/columns";
import { DataTable } from "../../../components/Tables/activities/data_table";

async function getData(): Promise<ActivitiesTable[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			userName: "norphel",
			Room_No: "HB-121",
			Request_type: ["Fan", "Socket"],
			date: new Date("02/02/24"),
			status: "Pending",
		},
		// ...
	];
}

export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
