// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection";
import { User } from "@/models/User";

// Connect to the database
const connectToDatabase = async () => {
  await dbConnect();
};

// Handle GET, PUT and DELETE requests for a specific user
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const body = await request.json();
    console.log("user id",params.id)
    console.log("user body",body)

    const updatedUser = await User.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 204 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
