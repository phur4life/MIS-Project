// app/api/membership/apply/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnection";
import { User } from "@/models/User";
import { auth } from "@/auth"; // Ensure this points to your auth options

export async function POST(req: Request) {
  await dbConnect();

  const session = await auth(); // Use getServerSession

  console.log(session);

  if (!session || session?.user?.role !== "user") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const userEmail = session.user.email;
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { membershipStatus: "Pending" },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Membership request submitted successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting membership request:", error);
    return NextResponse.json(
      {
        message: "Failed to submit request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
