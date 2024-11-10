"use client";
import React from "react";
import FAQAccordion from '@/components/AboutUsBox/FAQAccordion';
import FeedbackForm from '@/components/AboutUsBox/FeedbackForm';
import TabSection from '@/components/AboutUsBox/TabSection';
import Image from 'next/image';
import UserHeader from "@/components/Header/UserHeader";

const RequestPage: React.FC = () => {
    return (
        <div className="p-8 space-y-12">
          <UserHeader/>
          {/* Hero Section with Background Image */}
          <section 
            className="relative flex flex-col items-center justify-center text-center h-64 mb-12 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/user/background.jpg')" }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="relative text-4xl font-bold text-white z-10">What is the Maintenance Club & What Does It Do?</h1>
          </section>
  
          {/* About Us Section */}
          <section className="flex flex-wrap mb-12">
            <div className="w-full md:w-1/2 p-4">
              <Image src="/images/user/img.jpg" alt="About Us" width={400} height={300} className="rounded" />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-2xl font-semibold mb-4">CST Maintenance Club</h2>
              <p className="text-gray-700 mb-4">
                The club is a dedicated team of electrical engineering students committed to serving both their peers and the college community. Leveraging their technical skills and academic knowledge, they provide a range of services focused on solving electrical-related issues. Their expertise includes addressing problems with existing electrical fittings, overseeing the installation of new systems, and maintaining older installations to ensure safety and efficiency. By combining practical experience with a strong foundation in electrical engineering principles, the club plays a crucial role in enhancing the infrastructure and supporting the smooth operation of the campus environment.
              </p>
              <TabSection />
            </div>
          </section>
  
          {/* FAQ Section */}
          <section className="w-full md:w-1/4 p-4">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <FAQAccordion />
          </section>
  
          {/* Feedback Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Student Feedback</h2>
            <FeedbackForm />
          </section>
          
        </div>
      
    );
};

export default RequestPage;
