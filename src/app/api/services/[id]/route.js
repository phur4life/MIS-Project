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
	const {
		newName: serviceName,
		newDescription: description,
		newImage: image,
	} = await req.json();

	await connect();
	await Service.findByIdAndUpdate(id, { serviceName, description, image });
	return NextResponse.json({ message: "Service Updated" }, { status: 200 });
}
