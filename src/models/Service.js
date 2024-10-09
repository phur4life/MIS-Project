import mongoose, { Schema } from "mongoose";

// Define the Service schema
const ServiceSchema = new Schema({
	serviceName: {
		type: String,
		required: true, // Service name is required
	},
	description: {
		type: String, // Optional description field
	},
	image: {
		type: String, // Optional field for service image URL
	},
});

const Service =
	mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
