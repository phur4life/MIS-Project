"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
	id: string;
	name: string;
	email: string;
	profileImage: string;
	studentNumber: string;
	phoneNumber: string;
	room: string;
	gender: string;
	department: string;
	currentYear: string;
	role: string;
}

const aboutData = {
	additionalInfo:
		"I love exploring new technologies and sharing knowledge with others.",
};

interface ProfileProps {
	user: User;
	onSaveEdit: (updatedData: User) => void;
}

export default function ProfileCard({ user, onSaveEdit }: ProfileProps) {
	const [editingField, setEditingField] = useState<string | null>(null);
	const [editedUser, setEditedUser] = useState<User>({
		...user,
		room: user.room || "", // Ensure room has a default value
	});
	const [imageUpload, setImageUploaded] = useState(false);

	// Handle field edit toggle
	const handleEdit = (field: string) => {
		setEditingField(field);
	};

	// Handle field save
	const handleSave = (field: string) => {
		onSaveEdit(editedUser);
		setEditingField(null);
	};

	// Handle input change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		setEditedUser((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
	};

	const handleCancel = (field: string) => {
		setEditingField(null);
		setEditedUser(user);
	};

	// Handle department field split
	const handleDepartmentChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		part: "currentYear" | "department"
	) => {
		setEditedUser((prev) => ({
			...prev,
			[part]: e.target.value,
		}));
	};

	const uploadImage = async (result: any) => {
		const imageUrl = result?.info.secure_url;

		// Update the profile image URL and save
		setEditedUser((prev) => {
			const updatedUser = { ...prev, profileImage: imageUrl };
			//onSaveEdit(updatedUser); // Save immediately after updating
			return updatedUser; // Return updated state
		});

		setImageUploaded(!imageUpload);
	};

	const handleRoomChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		part: "block" | "number"
	) => {
		setEditedUser((prev) => {
			const [block, number] = prev.room.includes("-")
				? prev.room.split("-") // Split by hyphen
				: ["", ""]; // Default to empty strings if the room format is incorrect

			return {
				...prev,
				room:
					part === "block"
						? `${e.target.value}-${number}` // Update block, keep the number unchanged
						: `${block}-${e.target.value}`, // Update number, keep the block unchanged
			};
		});
	};

	const generateRoomNumbers = () => {
		const rooms: string[] = [];
		for (let floor = 1; floor <= 4; floor++) {
			for (let room = 1; room <= 20; room++) {
				if (room < 10) {
					rooms.push(`${floor}0${room}`);
				} else {
					rooms.push(`${floor}${room}`);
				}
			}
		}
		return rooms;
	};

	const handleImage = () => {
		setImageUploaded(!imageUpload);
		onSaveEdit(editedUser);
		console.log(editedUser);
	};

	//console.log(editedUser);

	return (
		<div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
			<div className="flex items-center justify-between">
				<img
					src={editedUser.profileImage || "/images/logo/logo.png"}
					alt="Avatar"
					className="w-24 h-24 rounded-full mb-4 object-cover"
				/>
				{imageUpload ? (
					<Button onClick={handleImage}>Save</Button>
				) : (
					<CldUploadWidget uploadPreset="MIS_project" onSuccess={uploadImage}>
						{({ open }) => {
							return (
								<>
									<Button className="m-4" type="button" onClick={() => open()}>
										Upload an Image
									</Button>
								</>
							);
						}}
					</CldUploadWidget>
				)}
			</div>

			<div className="mt-6 border p-4 rounded shadow-md">
				{/* User Fields */}
				<ProfileField
					label="Your Name"
					value={editedUser.name}
					field="name"
					isEditing={editingField === "name"}
					onEdit={() => handleEdit("name")}
					onSave={() => handleSave("name")}
					onCancel={() => handleCancel("name")}
					onChange={handleChange}
				/>

				<ProfileField
					label="Your Student Number"
					value={editedUser.studentNumber}
					field="studentNumber"
					isEditing={editingField === "studentNumber"}
					onEdit={() => handleEdit("studentNumber")}
					onSave={() => handleSave("studentNumber")}
					onCancel={() => handleCancel("studentNumber")}
					onChange={handleChange}
				/>

				{/* Department Fields with Dropdowns */}
				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Department</h3>
					<div className="flex items-center h-8 justify-between">
						{editingField === "department" ? (
							<div className="flex space-x-2">
								<select
									value={editedUser.currentYear}
									onChange={(e) => handleDepartmentChange(e, "currentYear")}
									className="text-gray-500 border rounded px-2"
								>
									<option value="">Select Year</option>
									<option value="1">1st Year</option>
									<option value="2">2nd Year</option>
									<option value="3">3rd Year</option>
									<option value="4">4th Year</option>
								</select>

								<select
									value={editedUser.department}
									onChange={(e) => handleDepartmentChange(e, "department")}
									className="text-gray-500 w-1/2 border rounded px-2"
								>
									<option value="">Select Department</option>
									<option value="Information Technology">
										Information Technology
									</option>
									<option value="Electrical Engineering">
										Electrical Engineering
									</option>
									<option value="Mechanical Engineering">
										Mechanical Engineering
									</option>
									<option value="Geology Engineering">
										Geology Engineering
									</option>
									<option value="Geology Engineering">
										Water Resource Engineering
									</option>
									<option value="Civil Engineering">Civil Engineering</option>
								</select>
							</div>
						) : (
							<span className="text-gray-500 text-center">
								{`${editedUser.currentYear} ${editedUser.department}`}
							</span>
						)}
						<div className="flex space-x-2">
							<Button
								className="bg-gray-100 mt-2"
								onClick={
									editingField === "department"
										? () => handleSave("department")
										: () => handleEdit("department")
								}
							>
								{editingField === "department" ? "Save" : "Edit"}
							</Button>
							{editingField === "department" && (
								<Button
									className="bg-red-100 mt-2"
									onClick={() => handleCancel("department")}
								>
									Cancel
								</Button>
							)}
						</div>
					</div>
				</div>

				{/* Room No Fields with Block and Number Dropdowns */}
				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Room No</h3>
					<div className="flex items-center h-8 justify-between">
						{editingField === "room" ? (
							<div className="flex space-x-2">
								<select
									value={editedUser.room.split("-")[0] || ""} // Block part
									onChange={(e) => handleRoomChange(e, "block")}
									className="text-gray-500 w-1/2 border rounded px-2"
								>
									<option value="">Select Block</option>
									<option value="HA">HA</option>
									<option value="HB">HB</option>
									<option value="RK">RK</option>
									<option value="NK">NK</option>
									<option value="HE">HE</option>
								</select>

								<select
									value={editedUser.room.split("-")[1] || ""} // Room number part
									onChange={(e) => handleRoomChange(e, "number")}
									className="text-gray-500 border rounded px-2"
								>
									<option value="">Select Room Number</option>
									{generateRoomNumbers().map((room) => (
										<option key={room} value={room}>
											{room}
										</option>
									))}
								</select>
							</div>
						) : (
							<span className="text-gray-500 text-center">
								{editedUser.room}
							</span>
						)}
						<div className="flex space-x-2">
							<Button
								className="bg-gray-100 mt-2"
								onClick={
									editingField === "room"
										? () => handleSave("room")
										: () => handleEdit("room")
								}
							>
								{editingField === "room" ? "Save" : "Edit"}
							</Button>
							{editingField === "room" && (
								<Button
									className="bg-red-100 mt-2"
									onClick={() => handleCancel("room")}
								>
									Cancel
								</Button>
							)}
						</div>
					</div>
				</div>
				<ProfileField
					label="Email"
					value={editedUser.email}
					field="email"
					isEditing={editingField === "email"}
					onEdit={() => handleEdit("email")}
					onSave={() => handleSave("email")}
					onCancel={() => handleCancel("email")}
					onChange={handleChange}
				/>
				<ProfileField
					label="Contact"
					value={editedUser.phoneNumber}
					field="phoneNumber"
					isEditing={editingField === "contact"}
					onEdit={() => handleEdit("contact")}
					onSave={() => handleSave("contact")}
					onCancel={() => handleCancel("contact")}
					onChange={handleChange}
				/>
				{/* About Section */}
				<AboutSection about={aboutData} />
			</div>
		</div>
	);
}

const ProfileField = ({
	label,
	value,
	field,
	isEditing,
	onEdit,
	onSave,
	onCancel,
	onChange,
}: {
	label: string;
	value: string;
	field: string;
	isEditing: boolean;
	onEdit: () => void;
	onSave: () => void;
	onCancel: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}) => (
	<div className="mb-4">
		<h3 className="text-gray-700 font-semibold">{label}</h3>
		<div className="flex items-center h-8 justify-between">
			{isEditing ? (
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e, field)}
					className="text-gray-500 border rounded px-2"
				/>
			) : (
				<span className="text-gray-500 text-center">{value}</span>
			)}
			<div className="flex space-x-2">
				<Button
					className="bg-gray-100 mt-2"
					onClick={isEditing ? onSave : onEdit}
				>
					{isEditing ? "Save" : "Edit"}
				</Button>
				{isEditing && (
					<Button className="bg-red-100 mt-2" onClick={onCancel}>
						Cancel
					</Button>
				)}
			</div>
		</div>
	</div>
);

const AboutSection = ({ about }: { about: { additionalInfo: string } }) => (
	<div className="mt-6 border p-4 rounded shadow-md">
		<h3 className="text-gray-700 font-semibold">About</h3>
		<div className="text-gray-500">{about.additionalInfo}</div>
		<Button className="bg-gray-100 mt-2">Edit</Button>
	</div>
);
