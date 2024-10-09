import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo Connection Successful"); // Log success message
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error); // Log the error for debugging
    throw new Error("Error in connecting to MongoDB: " + error.message); // Throw a new error with the message
  }
};

export default dbConnect;
