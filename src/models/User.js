import mongoose from "mongoose";

// Create a new Schema instance
const Schema = mongoose.Schema;

// Define the Request sub-schema
const RequestSchema = new Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Service model
      ref: "Service",
      required: false,
    },
    description: {
      type: String, // Description of the request
      required: true,
    },
    phoneNumber: {
      type: String, // Phone number of the requester
      required: true,
    },
    blockNumber: {
      type: String, // Block number where the requester resides
      required: true,
    },
    roomNumber: {
      type: String, // Room number where the requester resides
      required: true,
    },
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending", // Default status when a request is created
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    requestDate: { type: Date, required: true },
  },
  { _id: true } // Ensure _id is true for embedded documents
);

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: function () {
      return !this.authProvider;
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.authProvider;
    },
  },
  phoneNumber: {
    // Move phoneNumber outside of password field
    type: String,
  },
  department: {
    type: String,
  },
  studentNumber: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  currentYear: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "member", "user"],
    default: "user",
  },
  authProvider: {
    type: String,
    default: "local",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },

  requests: [RequestSchema], // Embed requests as an array of RequestSchemas

  membership_request_status: {
    type: String,
    enum: ["pending", "active", "not_accepted"],
    default: "not_accepted",
  },
  date_of_joining: { type: Date, default: Date.now },
});

// Export the User model based on the UserSchema
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
