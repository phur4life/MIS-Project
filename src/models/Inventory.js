// Import mongoose library
import mongoose from "mongoose";

// Create a new Schema instance
const Schema = mongoose.Schema;

// Define the Inventory schema
const InventorySchema = new Schema({
  itemName: { 
    type: String, 
    required: true // Item name is required
  },
  quantity: { 
    type: Number, 
    required: true // Quantity is required
  },
  description: { 
    type: String // Optional description field
  },
  image: { 
    type: String // Optional field for item image URL
  },
  status: { 
    type: String, 
    enum: ['Available', 'Out of Stock'], // Status can only be Available or Out of Stock
    required: true // Status is required
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now // Automatically set to current date on creation
  }
});

// Export the Inventory model based on the InventorySchema
module.exports = mongoose.model('Inventory', InventorySchema);