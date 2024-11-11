// // app/api/membership/review/route.
// import dbConnect from "@/lib/dbConnection";
// import { User } from "@/models/User";
// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   await dbConnect();

//   const session = await auth();

//   if (!session || session?.user?.role !== "admin") {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//   }

//   const { userId, action } = await req.json();

//   if (!["approve", "reject"].includes(action)) {
//     return NextResponse.json({ message: "Invalid action" }, { status: 400 });
//   }

//   const newStatus = action === "approve" ? "active" : "not_accepted";
//   const newRole = action === "approve" ? "member" : "user";

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { membershipStatus: newStatus, role: newRole },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       {
//         message: `Membership ${newStatus.toLowerCase()} successfully`,
//         user: updatedUser,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating membership status:", error);
//     return NextResponse.json(
//       { message: "Failed to update membership status", error },
//       { status: 500 }
//     );
//   }
// }
// app/api/membership/review/route.js
import dbConnect from "@/lib/dbConnection";
import { User } from "@/models/User";
import { Team } from "@/models/Team";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Helper function to assign a user to a team
const assignUserToTeam = async (userId) => {
  // Find a team with fewer than 4 members
  let team = await Team.findOne({ memberCount: { $lt: 4 } });

  // If no team is found, create a new one
  if (!team) {
    team = new Team({
      name: `Team ${Date.now()}`,
      members: [],
      memberCount: 0,
    });
    await team.save();
  }

  // Add the user to the team and increment the team member count
  team.members.push(userId);
  team.memberCount += 1;
  await team.save();

  // Update the user's team reference
  await User.findByIdAndUpdate(userId, { teamId: team._id });

  return team;
};

// Helper function to remove the user from a team and delete the team if empty
const removeUserFromTeam = async (userId) => {
  // Find the user and populate their teamId field to access the team data
  const user = await User.findById(userId).populate("teamId");

  if (!user || !user.teamId) {
    return; // If the user has no teamId, just return
  }

  const team = user.teamId;

  // Remove the user from the team's member list
  team.members = team.members.filter(
    (memberId) => memberId.toString() !== userId
  );
  team.memberCount -= 1;

  // If the team has no members left, delete the team
  if (team.memberCount === 0) {
    await Team.findByIdAndDelete(team._id); // Delete the empty team
  } else {
    await team.save(); // Save the team with the updated members
  }

  // Remove the user's reference to the team
  await User.findByIdAndUpdate(userId, { teamId: null });
};

export async function POST(req) {
  try {
    await dbConnect();

    const session = await auth();

    // Check if the user has admin privileges
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { userId, action } = await req.json();

    // Validate action type
    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Determine new status and role based on the action
    const newStatus = action === "approve" ? "active" : "not_accepted";
    const newRole = action === "approve" ? "member" : "user";

    // Update the user's membership status and role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { membership_request_status: newStatus, role: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let responseMessage = `Membership ${newStatus.toLowerCase()} successfully`;
    const responseData = { user: updatedUser };

    // If approved, assign the user to a team
    if (action === "approve") {
      const team = await assignUserToTeam(userId);
      responseMessage += " and assigned to a team";
      responseData.team = team;
    }

    // Return success response
    return NextResponse.json(
      {
        message: responseMessage,
        ...responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating membership status:", error);
    return NextResponse.json(
      {
        message: "Failed to update membership status",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}

// PUT function to update a member's status to not_accepted and adjust team
export async function PUT(req) {
  try {
    await dbConnect();

    const session = await auth();

    // Check for admin privileges
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { userId } = await req.json();

    // Update the user's status to "not_accepted" and role to "user"
    const user = await User.findByIdAndUpdate(
      userId,
      { membership_request_status: "not_accepted", role: "user" },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Remove the user from the team if they belong to one
    await removeUserFromTeam(userId);

    return NextResponse.json(
      { message: "User marked as not accepted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status to not accepted:", error);
    return NextResponse.json(
      {
        message: "Failed to update user status",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
