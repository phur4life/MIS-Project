// app/api/users/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection"; // Ensure this is your database connection utility
import { User } from "@/models/User";

// Connect to the database
const connectToDatabase = async () => {
  await dbConnect();
};

// Handle GET and POST requests
export async function GET() {
  await connectToDatabase();
  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
