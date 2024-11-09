import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";

interface AddMemberModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddMember: (addMember: any) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
	isOpen,
	onClose,
	onAddMember,
}) => {
	const [name, setName] = React.useState(""); // State for name
	const [users, setUsers] = React.useState<any[]>([]); // State for users
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [searchTerm, setSearchTerm] = React.useState(""); // State for search term

	// Fetch users data
	const fetchUsers = async () => {
		try {
			const response = await fetch("/api/users"); // Make GET request to your API
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			const data = await response.json();
			setUsers(data); // Store users data in the state
		} catch (err) {
			setError("Error fetching users.");
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetchUsers(); // Fetch users data on component mount
	}, []);

	// Filter users based on search term
	const filteredUsers = users.filter((user: { name: string }) =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Handle name click to set the input field with the selected name
	const handleNameClick = (userName: string) => {
		setName(userName); // Set the clicked name to the 'name' state
		setSearchTerm(userName); // Optionally set searchTerm as well for the input field
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Find the user that matches the entered name
		const matchedUser = users.find(
			(user) => user.name.toLowerCase() === name.toLowerCase()
		);

		// Check if a matching user was found
		if (matchedUser) {
			onAddMember(matchedUser); // Pass the matched user to the parent
			setName(""); // Reset the name after submit
			setSearchTerm(""); // Optionally clear searchTerm as well
			onClose(); // Close the modal
		} else {
			// Handle case where no matching user was found
			alert("No user found with that name.");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button variant="outline">Add New Member</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Member</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						{/* Searchable input field */}
						<div>
							<Input
								placeholder="Search Member"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
							/>
						</div>

						{/* List of filtered users */}
						<div className="max-h-48 overflow-y-auto">
							{filteredUsers
								.filter(
									(user: { role: string }) =>
										user.role !== "member" && user.role !== "admin"
								) // Exclude users with "member" or "admin" role
								.map((user: { id: string; name: string }) => (
									<div
										key={user.id}
										className="p-2 cursor-pointer hover:bg-primary hover:opacity-0.2" // Added hover effect
										onClick={() => handleNameClick(user.name)} // Set selected user name
									>
										{user.name}
									</div>
								))}
						</div>
					</div>

					<div className="flex justify-end space-x-2 pt-4">
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Add Member</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddMemberModal;
