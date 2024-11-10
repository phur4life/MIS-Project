import BackgroundPicture from "@/components/Profile/BackgroundPicture";
import ProfessionalDetailsCard from "@/components/Profile/ProfessionalDetailsCard";
import ProfileCard from "@/components/Profile/ProfileCard";
import Link from "next/link";
import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const page = () => {
  return (
    <div className="bg-background m-0 relative min-h-screen">
      {/* Background picture */}
      <BackgroundPicture />

      {/* Back button with styling */}
      <div className="absolute top-4 left-4">
        <Link href="/admin/dashboard" className="text-gray-700 hover:text-gray-900">
          <IoArrowBackCircleSharp size={36} className="transition duration-200 transform hover:scale-110" />
        </Link>
      </div>

      {/* Centered content with slight overlap */}
      <div className="flex justify-center items-center relative">
        <div className="flex flex-col w-4/5 md:flex-row gap-6 p-6 bg-white bg-opacity-90 shadow-lg min-h-[70vh] -mt-10 z-10 rounded-lg">
          <ProfileCard />
          <ProfessionalDetailsCard />
        </div>
      </div>
    </div>
  );
};

export default page;
