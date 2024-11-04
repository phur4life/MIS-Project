import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons

interface Item {
	_id: string;
	serviceName: string;
	description: string;
	image: string;
}

interface ViewProps {
	isOpen: boolean;
	onClose: () => void;
	item: Item;
	onSave: (item: Item) => void;
}

const ServiceForm: React.FC<ViewProps> = ({
	isOpen,
	onClose,
	item,
	onSave,
}) => {
	const [editedItem, setEditedItem] = useState<Item>({ ...item });
	const [isEditing, setIsEditing] = useState(false); // Single state to control edit mode

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditedItem({ ...editedItem, [name]: value });
	};

	const handleEditToggle = () => {
		setIsEditing(!isEditing); // Toggle the editing state
	};

	const handleSave = () => {
		// setEditedItem((prev) => ({
		// 	...prev,
		// 	status: editedItem.quantity > 0 ? "Available" : "Out of Stock", // Ensure quantity doesn't go below 0
		// }));
		onSave(editedItem); // Pass the edited item
		setIsEditing(false); // Disable editing mode
		onClose();
	};

	return (
		<div
			className={`absolute inset-0 bg-gray-800 bg-opacity-20 flex justify-center items-center ${
				!isOpen ? "hidden" : ""
			}`}
		>
			<div className="bg-white p-6 rounded-lg shadow-lg w-auto max-w-3xl mx-auto">
				<div className="flex flex-row gap-2">
					<img
						src={editedItem.image}
						alt={`Image of ${editedItem.serviceName}`}
						className="w-1/2 h-64 object-cover rounded-md mr-4"
					/>
					<div className="flex-1">
						{/* Item Name */}
						<div className="flex items-center mb-4">
							<input
								name="serviceName"
								value={editedItem.serviceName}
								onChange={handleInputChange}
								readOnly={!isEditing}
								className={`w-full text-3xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
									isEditing ? "bg-gray-100" : "bg-white"
								}`}
							/>
						</div>

						{/* Description */}
						<div className="flex items-center mb-4">
							<textarea
								name="description"
								value={editedItem.description}
								onChange={handleInputChange}
								readOnly={!isEditing}
								className={`w-full px-6 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
									isEditing ? "bg-gray-100 h-32" : "bg-white"
								}`}
							/>
						</div>

						{/* Edit/Save Button */}
						<div className="flex gap-2">
							{!isEditing ? (
								<Button
									onClick={handleEditToggle}
									className="mt-4 text-white p-4 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200"
								>
									<FaEdit className="inline mr-2" />
									Edit
								</Button>
							) : (
								<Button
									onClick={handleSave}
									className="mt-4 text-white p-4 rounded-md bg-green-500 hover:bg-green-600 transition duration-200"
								>
									Save Changes
								</Button>
							)}
							<Button
								onClick={onClose}
								className="mt-4 text-white p-4 rounded-md bg-red-500 hover:bg-red-600 transition duration-200"
								aria-label="Close"
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceForm;
