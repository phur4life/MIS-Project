import { Button } from "../ui/button";

const userData = {
	username: "Tshering Norphel",
	email: "02210233.cst@rub.edu.bt",
	contact: "77662430",
	room: "HB-107",
	gender: "Male",
	department: "Information Technology",
	year: "Third year",
	about: "Im interested in sleeping but it seldom comes. Same with love",
	interest: ["Light Fixing", "Fan Fixing", "Exercise"],
	experience: 3,
	role: "user",
};

// components/ProfileCard.js
export default function ProfileCard() {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
			<div className="flex items-center justify-between">
				<img
					src="/images/user/user.webp"
					alt="Avatar"
					className="w-24 h-24 rounded-full mb-4"
				/>
				<Button className="bg-secondary text-white px-4 py-2 rounded-md">
					Upload Photo
				</Button>
			</div>

			<div className="mt-6 border p-4 rounded shadow-md">
				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Your Name</h3>
					<div className="flex items-center  h-8 justify-between">
						<span className="text-gray-500 text-center">Sid</span>
						<Button className="bg-gray-100  mt-2">Edit</Button>
					</div>
				</div>
				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Department</h3>
					<div className="flex items-center  h-8 justify-between">
						<span className="text-gray-500 text-center">
							{userData.year + " " + userData.department}
						</span>
						<Button className="bg-gray-100  mt-2">Edit</Button>
					</div>
				</div>
				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Room No</h3>
					<div className="flex items-center  h-8 justify-between">
						<span className="text-gray-500 text-center">{userData.room}</span>
						<Button className="bg-gray-100  mt-2">Edit</Button>
					</div>
				</div>

				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Email</h3>
					<div className="flex items-center h-8 justify-between">
						<span className="text-gray-500 text-center">{userData.email}</span>
						<Button className="bg-gray-100  mt-2">Edit</Button>
					</div>
				</div>

				<div className="mb-4">
					<h3 className="text-gray-700 font-semibold">Contact</h3>
					<div className="flex items-center h-8 justify-between">
						<span className="text-gray-500 text-center">
							{userData.contact}
						</span>
						<Button className="bg-gray-100  mt-2">Edit</Button>
					</div>
				</div>
			</div>
			<div className="mt-6 border p-4 rounded shadow-md">
				<h3 className="text-gray-700 font-semibold">About</h3>
				<div className="flex items-center h-8 justify-between">
					<span className="text-gray-500 text-center">{userData.about}</span>
					<Button className="bg-gray-100  mt-2">Edit</Button>
				</div>
			</div>
		</div>
	);
}
