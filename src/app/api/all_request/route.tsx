import { NextResponse } from "next/server";
import { User } from "@/models/User";
import dbConnect from "@/lib/dbConnection";

// GET handler to fetch all requests
export async function GET(req) {
  await dbConnect();

  try {
    // Fetch all requests from all users
    const teamRequests = await User.find({}).select("requests username");

    // Flatten all requests and include the username of the user who sent the request
    const allRequests = teamRequests.flatMap((user) =>
      user.requests.map((request) => ({
        ...request.toObject(),
        username: user.username, // Assuming 'username' is a field in the User model
      }))
    );

    return NextResponse.json(allRequests);
  } catch (error) {
    console.error("Error fetching team requests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
