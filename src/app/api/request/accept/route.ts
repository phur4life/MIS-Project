import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Assuming you're using next-auth
import { User } from "@/models/User";
import dbConnect from "@/lib/dbConnection";

// GET handler to fetch team requests
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

    // Fetch all requests associated with the user's team
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

// PATCH handler to update the status of a request
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

    // Update the request status within the user's team
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

    // Return the updated request for immediate frontend feedback
    const updatedRequest = updatedUser.requests.find(
      (req) => req._id.toString() === requestId
    );

    return NextResponse.json({
      success: true,
      message: `Request status updated to ${newStatus} successfully.`,
      updatedRequest, // Return the updated request
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
