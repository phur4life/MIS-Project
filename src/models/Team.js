import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    teamName: { 
      type: String, 
      required: true // Team name is required
    },
    members: [{ 
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User' 
    }]
  });

  module.exports = mongoose.model('Team', TeamSchema);