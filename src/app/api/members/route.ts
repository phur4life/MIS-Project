import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection"; // Adjust the import as needed
import { User } from "@/models/User";

// Connect to the database
const connectToDatabase = async () => {
  await dbConnect();
};

// Handle GET requests
export async function GET(request: Request) {
  await connectToDatabase();
  try {
    const members = await User.find({ role: "Member" });
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const newUser = new User({ ...body, role: "Member" });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
