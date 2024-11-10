import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection"; // Ensure this is your database connection utility
import { User } from "@/models/User";

export async function GET(
	request: Request,
	{ params }: { params: { email: string } }
) {
	await dbConnect();
	try {
		// Ensure that params.email is a valid search term, even with @
		const users = await User.findOne({
			email: new RegExp(params.email, "i"), // Case-insensitive regex
		});

		return NextResponse.json(users, { status: 200 });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ success: false, message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
