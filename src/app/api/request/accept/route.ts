import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Assuming you're using next-auth
import { User } from "@/models/User";
import dbConnect from "@/lib/dbConnection";

// Define the GET handler to fetch team requests
export async function GET(req) {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: User not logged in" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const user = await User.findById(userId).select("teamId");
    if (!user || !user.teamId) {
      return NextResponse.json(
        { error: "User not associated with a team" },
        { status: 404 }
      );
    }

    const teamRequests = await User.find({ teamId: user.teamId }).select(
      "requests"
    );
    const allRequests = teamRequests.flatMap((u) => u.requests);

    return NextResponse.json(allRequests);
  } catch (error) {
    console.error("Error fetching team requests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Define the PATCH handler to update the status of a request
export async function PATCH(req) {
  await dbConnect();

  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: User not logged in" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const { requestId, newStatus } = await req.json();

    // Validate the newStatus is one of the allowed values
    const allowedStatuses = ["pending", "in_progress", "completed"];
    if (!allowedStatuses.includes(newStatus)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Find the user and verify the request belongs to the user's team
    const user = await User.findById(userId).select("teamId");
    if (!user || !user.teamId) {
      return NextResponse.json(
        { error: "User not associated with a team" },
        { status: 404 }
      );
    }

    // Find the user who has the request and update the status
    const updatedUser = await User.findOneAndUpdate(
      {
        teamId: user.teamId,
        "requests._id": requestId,
      },
      {
        $set: { "requests.$.status": newStatus },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Request not found or not authorized to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request status updated successfully.",
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
