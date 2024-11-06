// Import mongoose library
import mongoose from "mongoose";
import { type } from "os";
// Create a new Schema instance
const Schema = mongoose.Schema;

// Define the Request sub-schema
const RequestSchema = new Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Service model
      ref: "Service",
      required: true, // Service reference is required
    },
    description: {
      type: String, // Description of the request
      required: true, // Description is required
    },
    phoneNumber: {
      type: String, // Phone number of the requester
      required: true, // Phone number is required
    },
    blockNumber: {
      type: String, // Block number where the requester resides
      required: true, // Block number is required
    },
    roomNumber: {
      type: String, // Room number where the requester resides
      required: true, // Room number is required
    },
    inventoryId: {
      // Reference to Team model.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
  },
  { _id: false }
); // Disable automatic _id generation for sub-documents

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: function () {
      return !this.authProvider;
    },
  },
  email: {
    required: true,
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
    required: function () {
      return !this.authProvider;
    },
    phoneNumber:{
      type:String
    }
  },
  department: {
    type: String, // Optional department field
  },
  studentNumber: {
    type: String,
  },
  profileImage: { type: String},
  currentYear: {
    type: String, // Current year of study
  },
  role: {
    type: String,
    enum: ["admin", "member", "user"],
    default: "user", // Role can only be one of these values
    // required: true, // Role is required
  },
  authProvider: { type: String, default: "local" },
  status: {
    type: String,
    enum: ["Active", "Inactive"], // Status can only be Active or Inactive
    // required: true, // Status is required
  },
  teamId: {
    // Reference to Team model.
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    // required: true,
  },

  requests: [RequestSchema], // Embed requests as an array of RequestSchemas
});

// Export the User model based on the UserSchema
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
//'User' is a collection name
