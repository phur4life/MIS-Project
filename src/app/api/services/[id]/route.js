import connect from "../../../../lib/dbConnection";
import Service from "../../../../models/Service";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const { id } = params;
	await connect();
	const service = await Service.findOne({ _id: id });
	return NextResponse.json({ service }, { status: 200 });
}

export async function PUT(req, { params }) {
	const { id } = params;

	// Destructure the new data from the request body
	const { serviceName, description, image } = await req.json();

	await connect();

	// Find and update the service by ID
	const updatedService = await Service.findByIdAndUpdate(
		id,
		{ serviceName, description, image },
		{ new: true } // This option returns the updated document
	);

	if (!updatedService) {
		return NextResponse.json({ message: "Service not found" }, { status: 404 });
	}

	return NextResponse.json(
		{ message: "Service Updated", updatedService },
		{ status: 200 }
	);
}

export async function DELETE(req, { params }) {
	const { id } = params;
	await connect();
	await Service.findByIdAndDelete(id);
	return NextResponse.json({ message: "Service Deleted" }, { status: 200 });
}
