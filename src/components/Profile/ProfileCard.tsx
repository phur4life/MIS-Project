"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
	id: string;
	name: string;
	email: string;
	image: string;
	contact: string;
	room: string;
	gender: string;
	department: string;
	year: string;
	role: string;
}

const aboutData = {
	additionalInfo:
		"I love exploring new technologies and sharing knowledge with others.",
};

export default function ProfileCard() {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const session = await getSession();
				if (!session?.user) {
					router.push("/");
				} else {
					setUser(session.user as User);
				}
			} catch (error) {
				console.error("Failed to fetch session:", error);
			}
		};

		fetchSession();
	}, [router]);

	return (
		<div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
			<div className="flex items-center justify-between">
				<img
					src={user?.image || "/images/logo/logo.png"}
					alt="Avatar"
					className="w-24 h-24 rounded-full mb-4"
				/>
				<Button className="bg-secondary text-white px-4 py-2 rounded-md">
					Upload Photo
				</Button>
			</div>

			<div className="mt-6 border p-4 rounded shadow-md">
				{user ? (
					<>
						{/* Other Profile Fields */}
						<ProfileField label="Your Name" value={user.email} />
						<ProfileField
							label="Department"
							value={`${user.year} ${user.department}`}
						/>
						<ProfileField label="Room No" value={user.room} />
						<ProfileField label="Email" value={user.email} />
						<ProfileField label="Contact" value={user.contact} />
						{/* About Section */}
						<AboutSection about={aboutData} />
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}

const ProfileField = ({ label, value }) => (
	<div className="mb-4">
		<h3 className="text-gray-700 font-semibold">{label}</h3>
		<div className="flex items-center h-8 justify-between">
			<span className="text-gray-500 text-center">{value}</span>
			<Button className="bg-gray-100 mt-2">Edit</Button>
		</div>
	</div>
);

const AboutSection = ({ about }) => (
	<div className="mt-6 border p-4 rounded shadow-md">
		<h3 className="text-gray-700 font-semibold">About</h3>
		<div className="text-gray-500">{aboutData.additionalInfo}</div>
		<Button className="bg-gray-100 mt-2">Edit</Button>
	</div>
);
