"use client";
import React from "react";
import { Link } from "@mui/material";
import DropdownNotification from "@/components/Header/DropdownNotification";
import DropdownUser from "@/components/Header/DropdownUser";
import SearchForm from "@/components/Header/SearchForm";

const tabItems = [
  { name: "Home", link: "/", icon: "🏠" },
  { name: "Statistics", link: "/user/Statistic", icon: "📊" },
  { name: "Request", link: "/user/Request", icon: "📋" },
  { name: "About", link: "/user/About", icon: "ℹ️" },
];

const UserHeader = () => {
  return (
    <>
      {/* Header with navigation */}
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo/logo.png"
              alt="CST Repair Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-orange-600">
              CST REPAIR
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className=" mt-10 flex space-x-6 text-gray-700">
            {tabItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="hover:text-orange-500 flex items-center"
              >
                <span className="mr-3">{item.icon}</span> {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              <SearchForm />
              <DropdownNotification />
            </ul>
            <DropdownUser />
          </div>
        </div>
      </header>
    </>
  );
};
export default UserHeader;
