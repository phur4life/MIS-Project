"use client";
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from '@/components/CarouselBox/Carousel';
import AvailibilityDetail from '@/components/DetailBox/AvailibilityDetails';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DropdownNotification from '@/components/Header/DropdownNotification';
import SearchForm from '@/components/Header/SearchForm';
import DropdownUser from '@/components/Header/DropdownUser';

const Page: React.FC = () => {
  return (
    <div>
      {/* Header with navigation */}
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            <img src="/images/logo/logo.png" alt="CST Repair Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-orange-600">CST REPAIR</span>
          </div>
          <nav className="flex space-x-6 text-gray-700">
            <a href="#" className="hover:text-orange-500">Home</a>
            <a href="#" className="hover:text-orange-500">Statistics</a>
            <a href="#" className="hover:text-orange-500">Request</a>
            <a href="#" className="hover:text-orange-500">About</a>
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

      {/* Breadcrumb */}
      <Breadcrumb pageName="User Dashboard" />

      {/* Services Section */}
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <button className="text-gray-600"><i className="fas fa-chevron-left"></i></button>
            <div className="w-full max-w-5xl mx-auto">
              <Carousel />
            </div>
            <button className="text-gray-600"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>

      {/* Availability Details Section */}
        <div className="text-center text-gray-700">
          <AvailibilityDetail/>
        </div>

      
    </div>
  );
}

export default Page;
