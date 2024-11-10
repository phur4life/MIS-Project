"use client";
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from '@/components/CarouselBox/Carousel';
import AvailibilityDetail from '@/components/DetailBox/AvailibilityDetails';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import UserHeader from '@/components/Header/UserHeader';
import FooterComponent from '@/components/Footer/footercomponent';

const Page: React.FC = () => {
  return (
    <div>
      <UserHeader/>

      {/* Breadcrumb */}
      <Breadcrumb pageName="My Cart" />

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
        <FooterComponent/>

      
    </div>
  );
}

export default Page;
