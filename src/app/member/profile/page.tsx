import BackgroundPicture from "@/components/Profile/BackgroundPicture";
import ProfessionalDetailsCard from "@/components/Profile/ProfessionalDetailsCard";
import ProfileCard from "@/components/Profile/ProfileCard";
import React from "react";

const page = () => {
	return (
		<div className="bg-background m-0">
			<BackgroundPicture />
			<div className="flex flex-col w-4/5 md:flex-row gap-6 p-6 bg-background min-h-screen">
				<ProfileCard />
				<ProfessionalDetailsCard />
			</div>
		</div>
	);
};

export default page;
