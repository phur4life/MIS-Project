import BackgroundPicture from "@/components/Profile/BackgroundPicture";
import ProfessionalDetailsCard from "@/components/Profile/ProfessionalDetailsCard";
import ProfileCard from "@/components/Profile/ProfileCard";
import React from "react";

const page = () => {
	return (
		<div className="bg-background m-0 min-h-screen relative">
			<BackgroundPicture />
			{/* Update the styles of this div to be absolute */}
			<div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex flex-col w-4/5 md:flex-row gap-6 p-6">
				<ProfileCard />
				<ProfessionalDetailsCard />
			</div>
		</div>
	);
};

export default page;
