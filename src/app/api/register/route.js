// Import necessary modules and functions
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs/dist/bcrypt";
// Import dbConnect function (uncomment if needed)
import dbConnect from "@/lib/dbConnection";

// This function creates a new user in the database
export async function createUser(user) {
  try {
    await User.create(user);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user"); // Simplify error message for consistency
  }
}

// Define the POST function to handle user creation requests
export const POST = async (request) => {
  // Parse request body to get user details
  const { name, email, password } = await request.json();

  // Log incoming user data for debugging (optional)
  console.log("Incoming user data:", { name, email, password });

  // // Validate email format (assuming email should end with .cst@rub.edu.bt)
  const emailRegex = /^[\w.%+-]+\.cst@rub\.edu\.bt$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Connect to the database
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  // Encrypt the password before saving it
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds to 10 for better security
  } catch (error) {
    console.error("Password hashing error:", error);
    return NextResponse.json(
      { error: "Failed to hash password" },
      { status: 500 }
    );
  }

  // Prepare the user data to save to the database
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  // Try creating the user in the database
  try {
    await createUser(newUser);
    return NextResponse.json(
      { message: "User has been created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
};
