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

export default function ProfessionalDetailsCard() {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
			<div className="flex justify-between border rounded-lg p-4 border-gray-200 border-2 shadow-md">
				<div className="w-[72]">
					<h3 className="text-gray-700 font-bold mb-4">Professional Details</h3>
					<p className="text-gray-500 mb-6">
						These are the professional details shown to users in the app.
					</p>
				</div>
				<img src="/images/logo/Stars.svg" alt="stars" className="h-16 w-16" />
			</div>

			<h4 className="text-gray-700 font-semibold mt-8 mb-4">Expertise In</h4>
			<div className="flex flex-wrap gap-2 mb-6">
				{userData.interest.map((interst, index) => (
					<span
						className="p-4 text-gray-700 border border-gray-300 border-2 py-1 px-3 rounded-full"
						key={index}
					>
						{interst}
					</span>
				))}
			</div>
			<h4 className="mb-4 text-gray-700 font-semibold">Total Experience</h4>
			<div className="flex justify-between border rounded-lg p-2 border-gray-200 border-2 shadow-md">
				<div>
					<p className="text-lg px-4">{userData.experience} Years</p>
					<span className=" px-4 text-gray-500">of total experience</span>
				</div>
				<div className="bg-primary w-auto rounded-lg">
					<img
						src="/images/logo/MedalStar.svg"
						alt="medal"
						className="h-16 w-16"
					/>
				</div>
			</div>

			<h4 className="mt-8 mb-4 text-gray-700 font-semibold">Role</h4>
			<div className="flex justify-between border rounded-lg p-2 border-gray-200 border-2 shadow-md">
				<div className="flex items-center px-4">
					<p className="text-lg">{userData.role} </p>
				</div>
				<div className="bg-primary w-auto rounded-lg">
					<img src="/images/logo/Star.svg" alt="medal" className="h-16 w-16" />
				</div>
			</div>
		</div>
	);
}
