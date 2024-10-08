import { NextResponse } from "next/server";
import connect from "../../../lib/dbConnection";
import Service from "../../../models/Service";

export async function POST(req) {
	const { serviceName, description, image } = await req.json();
	await connect();
	await Service.create({ serviceName, description, image });
	return NextResponse.json({ message: "Service Created" }, { status: 201 });
}

export async function GET() {
	await connect();
	const services = await Service.find();
	return NextResponse.json({ services });
}
export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connect();
	await Service.findByIdAndDelete(id);
	return NextResponse.json({ message: "Service deleted" }, { status: 200 });
}
