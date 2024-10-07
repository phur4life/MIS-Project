import mongoose from "mongoose";

// Create a new Schema instance
const Schema = mongoose.Schema;

// Define the Service schema
const ServiceSchema = new Schema({
  serviceName: { 
    type: String, 
    required: true // Service name is required
  },
  description: { 
    type: String // Optional description field
  },
  image: { 
    type: String // Optional field for service image URL
  }
});

// Export the Service model based on the ServiceSchema
module.exports = mongoose.model('Service', ServiceSchema);