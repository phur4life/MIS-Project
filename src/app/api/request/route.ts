// import { auth } from "@/auth"; // Import the session hook for next-auth
// import { User } from "@/models/User";
// import dbConnect from "@/lib/dbConnection";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//     const {
//       serviceId,
//       description,
//       phoneNumber,
//       blockNumber,
//       roomNumber,
//       teamId, // Capturing teamId from request body
//     } = req.body;

//     // Get session to retrieve the userId
//     const session = await auth();

//     if (!session || !session.user) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized: User not logged in" });
//     }

//     const userId = session.user.id; // Assuming user ID is stored in session

//     try {
//       // Find the user by userId (from session)
//       const user = await User.findById(userId);
//       if (!user) return res.status(404).json({ error: "User not found" });

//       // Create a new request and associate it with the correct team
//       const newRequest = {
//         serviceId,
//         description,
//         phoneNumber,
//         blockNumber,
//         roomNumber,
//         status: "pending", // Set initial status as "pending"
//         teamId, // The teamId will directly be passed from the client-side
//       };

//       // Push the new request to the user's requests array
//       user.requests.push(newRequest);

//       // Save the user with the new request
//       await user.save();

//       res.status(201).json({
//         success: true,
//         message: "Request submitted successfully.",
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { User } from "@/models/User";
import dbConnect from "@/lib/dbConnection";

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
      teamId,
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

    const userId = session.user.id; // Assuming the user ID is stored in session

    // Find the user by userId (from session)
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new request and associate it with the correct team
    const newRequest = {
      serviceId,
      description,
      phoneNumber,
      blockNumber,
      roomNumber,
      inventoryId,
      status: "pending", // Set initial status as "pending"
      teamId,
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
