import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Assuming you're using next-auth for authentication
import { User } from "@/models/User"; // Assuming the User model contains requests and teamId
import dbConnect from "@/lib/dbConnection"; // MongoDB connection utility

// GET handler to fetch team requests
export async function GET(req) {
  await dbConnect();

  // Authenticate the user
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: User not logged in" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    // Fetch the user's teamId
    const user = await User.findById(userId).select("teamId");
    if (!user || !user.teamId) {
      return NextResponse.json(
        { error: "User not associated with a team" },
        { status: 404 }
      );
    }

    // Fetch all users in the same team and their requests
    const teamRequests = await User.find({ teamId: user.teamId }).select("requests username");

    // Flatten the requests and include the username of the user who sent the request
    const allRequests = teamRequests.flatMap((u) =>
      u.requests.map((request) => ({
        ...request.toObject(), // Convert mongoose document to plain object
        username: u.username, // Include the username of the user who created the request
      }))
    );

    return NextResponse.json(allRequests);
  } catch (error) {
    console.error("Error fetching team requests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
