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

//   const newStatus = action === "approve" ? "Approved" : "Rejected";
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
import { Team } from "@/models/Team"; // Import the Team model
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const assignUserToTeam = async (userId) => {
  // Find a team with fewer than 4 members
  let team = await Team.findOne({ memberCount: { $lt: 4 } });

  // If no available team is found, create a new one
  if (!team) {
    team = new Team({
      name: `Team ${Date.now()}`,
      members: [],
      memberCount: 0,
    });
    await team.save();
  }

  // Add the user to the team and increment the member count
  team.members.push(userId);
  team.memberCount += 1;
  await team.save();

  // Update the user's team reference
  await User.findByIdAndUpdate(userId, { teamId: team._id });

  return team;
};

export async function POST(req) {
  await dbConnect();

  const session = await auth();

  // Check if the user has admin privileges
  if (!session || session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { userId, action } = await req.json();

  // Validate action type
  if (!["approve", "reject"].includes(action)) {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  const newStatus = action === "approve" ? "Approved" : "Rejected";
  const newRole = action === "approve" ? "member" : "user";

  try {
    // Find and update the user's membership status and role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { membershipStatus: newStatus, role: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let responseMessage = `Membership ${newStatus.toLowerCase()} successfully`;
    const responseData = { user: updatedUser };

    // If the user is approved, assign them to a team
    if (action === "approve") {
      const team = await assignUserToTeam(userId);
      responseMessage += " and assigned to a team";
      responseData.team = team;
    }

    // Return the response with updated user and team info (if applicable)
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
      { message: "Failed to update membership status", error },
      { status: 500 }
    );
  }
}
