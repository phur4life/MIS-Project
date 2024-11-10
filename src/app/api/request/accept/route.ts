import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Assuming you're using next-auth
import { User } from "@/models/User";
import dbConnect from "@/lib/dbConnection";

// Define the GET handler to fetch team requests
export async function GET(req) {
  // Ensure the database connection is established
  await dbConnect();

  // Get session to retrieve the userId and teamId
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: User not logged in" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    // Find the user by userId and check their teamId
    const user = await User.findById(userId).select("teamId");
    if (!user || !user.teamId) {
      return NextResponse.json(
        { error: "User not associated with a team" },
        { status: 404 }
      );
    }

    // Fetch all users who belong to the same team and get their requests
    const teamRequests = await User.find({ teamId: user.teamId }).select(
      "requests"
    );

    // Flatten the team requests (since user.requests is an array of request arrays)
    const allRequests = teamRequests.flatMap((u) => u.requests);

    return NextResponse.json(allRequests); // Return all requests for the team
  } catch (error) {
    console.error("Error fetching team requests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
