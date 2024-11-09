// models/Team.js
import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  memberCount: { type: Number, default: 0 }, // Keeps track of members in the team
});

// Check if the model already exists to avoid model overwrite error
export const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);
