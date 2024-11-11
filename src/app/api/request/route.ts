import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { User } from "@/models/User";
import dbConnect from "@/lib/dbConnection";
import { getAssignedTeamForDate } from "@/lib/teamAssignment"; // Correct path to the helper

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const {
      serviceId,
      description,
      phoneNumber,
      blockNumber,
      roomNumber,
      inventoryId,
      selectedDate, // This will be 'today' or 'tomorrow'
    } = await req.json();

    // Get the session to retrieve the userId
    const session = await auth();

    if (!session || !session.user) {
      console.error("User not logged in");
      return NextResponse.json(
        { error: "Unauthorized: User not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id; // Get userId from the session

    // Find the user by userId (from session)
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get today's date
    const today = new Date(); // Get today's date

    // Calculate tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date

    // Select the correct date based on the selected date from the frontend
    const requestDate =
      selectedDate === "today"
        ? today
        : selectedDate === "tomorrow"
        ? tomorrow
        : today;

    // Get the team for today or tomorrow, based on the selected date
    const teamForSelectedDate = await getAssignedTeamForDate(requestDate);

    // Create a new request object and associate it with the correct team and date
    const newRequest = {
      serviceId,
      description,
      phoneNumber,
      blockNumber,
      roomNumber,
      inventoryId,
      status: "pending", // Set initial status as "pending"
      teamId: teamForSelectedDate._id, // Dynamically assigned team
      requestDate, // Store the selected date (today or tomorrow)
    };

    // Push the new request to the user's requests array
    user.requests.push(newRequest);

    // Save the user with the new request
    await user.save();
    console.log("Request saved successfully");

    return NextResponse.json(
      { success: true, message: "Request submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
