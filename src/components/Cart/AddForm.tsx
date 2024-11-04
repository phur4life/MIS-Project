import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";

interface serviceData {
	_id: string;
	serviceName: string;
	description: string;
	image: string;
}

interface AddFormProps {
	handleItemAdd: (itemToAdd: serviceData) => void;
	closeModal: () => void; // Function to close the modal
}

const AddForm: React.FC<AddFormProps> = ({ handleItemAdd, closeModal }) => {
	const [newItem, setNewItem] = useState<Partial<serviceData>>({
		serviceName: "",
		description: "",
		image: "",
	});

	function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;
		setNewItem({
			...newItem,
			[name]: value,
		});
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		//console.log("Submiited");
		if (newItem.serviceName && newItem.description && newItem.image) {
			handleItemAdd(newItem as serviceData);
		}
	}

	return (
		<div className="bg-white p-6 rounded-md shadow-lg w-96">
			<h2 className="text-lg font-bold mb-4">Add New Service</h2>
			<form onSubmit={handleSubmit}>
				<CldUploadWidget
					uploadPreset="MIS_project"
					onSuccess={(result, { widget }) => {
						//console.log("Image URL:", result?.info.secure_url);
						setNewItem({ ...newItem, image: result?.info.secure_url });
					}}
				>
					{({ open }) => {
						//console.log(newItem.image === ""); // Logs if the image URL is empty

						return (
							<>
								{/* Conditionally render either an empty div or the image */}
								{newItem.image === "" ? (
									<div></div>
								) : (
									<img src={newItem.image} alt="Uploaded Preview" />
								)}
								{/* Button to open the upload widget */}
								<Button className="m-4" type="button" onClick={() => open()}>
									Upload an Image
								</Button>
							</>
						);
					}}
				</CldUploadWidget>
				<input
					type="text"
					name="serviceName"
					placeholder="Service Name"
					value={newItem.serviceName || ""}
					onChange={handleInputChange}
					required
					className="w-full mb-2 p-2 border border-gray-300 rounded"
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					value={newItem.description || ""}
					onChange={handleInputChange}
					required
					className="w-full mb-2 p-2 border border-gray-300 rounded"
				/>
				<div className="flex justify-end gap-2">
					<Button type="submit">Add</Button>
					<Button type="button" onClick={closeModal}>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddForm;
