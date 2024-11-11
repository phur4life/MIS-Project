import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection";
import { User } from "@/models/User";
import { Team } from "@/models/Team"; // Import the Team model

// Connect to the database
const connectToDatabase = async () => {
  await dbConnect();
};

// Handle GET requests
// export async function GET(
// 	request: Request,
// 	{ params }: { params: { id: string } }
// ) {
// 	await connectToDatabase();
// 	const { id } = params;

// 	try {
// 		const member = await User.findOne({ _id: id, role: "Member" });
// 		if (!member) {
// 			return NextResponse.json(
// 				{ success: false, message: "Member not found" },
// 				{ status: 404 }
// 			);
// 		}
// 		return NextResponse.json(member, { status: 200 });
// 	} catch (error) {
// 		console.error("Error fetching member:", error);
// 		return NextResponse.json(
// 			{ success: false, message: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// }

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

// Handle PUT requests
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = params;

  try {
    const body = await request.json();
    const updatedMember = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    if (body.role === "member") {
      const team = await assignUserToTeam(id);
      updatedMember.teamId = team._id;
    }
    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle DELETE requests
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = params;

  try {
    const deletedMember = await User.findOneAndDelete({
      _id: id,
    });

    if (!deletedMember) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedMember },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
