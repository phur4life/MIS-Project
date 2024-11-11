"use client";
import React from "react";
import { Link } from "@mui/material";
import DropdownNotification from "@/components/Header/DropdownNotification";
import DropdownUser from "@/components/Header/DropdownUser";
import SearchForm from "@/components/Header/SearchForm";

// const tabItems = [
// 	{ name: "Home", link: "/", icon: "🏠" },
// 	{ name: "Statistics", link: "/user/Statistic", icon: "📊" },
// 	{ name: "Request", link: "/user/Request", icon: "📋" },
// 	{ name: "About", link: "/user/About", icon: "ℹ️" },
// ];

const tabItems = [
  { name: "Home", link: "/user/Home" },
  { name: "Statistics", link: "/user/Statistic" },
  { name: "Request", link: "/user/Request" },
  { name: "About", link: "/user/About" },
];
const UserHeader = () => {
  return (
    <>
      {/* Header with navigation */}
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo and title section */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo/logo.png"
              alt="CST Repair Logo"
              className="h-12 w-auto"
            />
            <span className="text-4xl font-bold text-orange-600">
              CST REPAIR
            </span>
          </div>

          <div className="flex gap-8">
            {/* Navigation Tabs */}
            <nav className="flex space-x-6 text-gray-700 items-center justify-end">
              {tabItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="hover:text-orange-600 text-gray-800 font-medium flex items-center no-underline text-lg"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 lg:w-full xl:w-auto">
              <ul className="flex items-center gap-4">
                {/* Uncomment SearchForm if needed */}
                {/* <SearchForm /> */}
                <DropdownNotification />
              </ul>
              <DropdownUser />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
