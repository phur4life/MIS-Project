import connect from "../../../lib/dbConnection";
import Inventory from "../../../models/Inventory";

// Handle GET request (fetch all inventory items)
export async function GET(req) {
	await connect();

	try {
		const inventoryItems = await Inventory.find({});
		return new Response(JSON.stringify(inventoryItems), { status: 200 });
	} catch (error) {
		console.error("Error fetching inventory items:", error);
		return new Response(
			JSON.stringify({ error: "Error fetching inventory items" }),
			{ status: 500 }
		);
	}
}

// Handle POST request (add new inventory item)
export async function POST(req) {
	try {
		await connect();
		const { itemName, quantity, description, image, status } = await req.json();

		const newItem = new Inventory({
			itemName,
			quantity,
			description,
			image,
			status,
		});

		await newItem.save();

		return new Response(JSON.stringify(newItem), { status: 201 });
	} catch (error) {
		console.error("Error adding new item:", error);
		return new Response(JSON.stringify({ error: "Error adding new item" }), {
			status: 500,
		});
	}
}

// Handle DELETE request (delete inventory item by ID)
export async function DELETE(req) {
	try {
		await connect();

		// Extract the item ID from the URL (assuming Next.js request parameter is passed via req.nextUrl)
		const itemId = req.nextUrl.searchParams.get("id");

		if (!itemId) {
			return new Response(JSON.stringify({ error: "Item ID is required" }), {
				status: 400,
			});
		}

		// Find the item by ID and delete it
		const deletedItem = await Inventory.findByIdAndDelete(itemId);

		if (!deletedItem) {
			return new Response(JSON.stringify({ error: "Item not found" }), {
				status: 404,
			});
		}

		return new Response(
			JSON.stringify({ message: "Item deleted successfully", deletedItem }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting item:", error);
		return new Response(JSON.stringify({ error: "Error deleting item" }), {
			status: 500,
		});
	}
}

// Handle PUT request (update inventory item by ID)
export async function PUT(req) {
	try {
		await connect();

		// Extract the item ID from the URL query parameter
		const itemId = req.nextUrl.searchParams.get("id");

		if (!itemId) {
			return new Response(JSON.stringify({ error: "Item ID is required" }), {
				status: 400,
			});
		}

		// Extract the update data from the request body
		const updateData = await req.json();

		// Update the item by ID with new data
		const updatedItem = await Inventory.findByIdAndUpdate(itemId, updateData, {
			new: true, // Return the updated document
			runValidators: true, // Ensure validation is run
		});

		if (!updatedItem) {
			return new Response(JSON.stringify({ error: "Item not found" }), {
				status: 404,
			});
		}

		return new Response(
			JSON.stringify({ message: "Item updated successfully", updatedItem }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating item:", error);
		return new Response(JSON.stringify({ error: "Error updating item" }), {
			status: 500,
		});
	}
}
