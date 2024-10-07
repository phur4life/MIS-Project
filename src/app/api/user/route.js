// app/api/users/route.js (or pages/api/users.js depending on your structure)

import { NextResponse } from "next/server";
import connect from '../../../lib/dbConnection'; // Ensure this path is correct
import User from "../../../models/User"; // Ensure this path is correct

export const GET = async () => {
    try {
        await connect(); // Attempt to connect to the database
        const users = await User.find({}); // Fetch all users
        console.log("Users fetched successfully:", users); // Log fetched users
        return NextResponse.json(users, { status: 200 }); // Return users as JSON response
    } catch (error) {
        console.error("Error fetching users:", error); // Log the error details
        return NextResponse.json({ message: "Error in fetching user", error: error.message }, { status: 500 }); // Return error message
    }
}

