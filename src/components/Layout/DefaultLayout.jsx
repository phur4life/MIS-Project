"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/Header/index";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen ">
      {/* Header at the top */}
      <Header/>
      {/* Content below the header */}
      <div className="flex flex-grow pt-5 mt-14">
        {/* Sidebar with a fixed width */}
        <div className="w-40">
          <Sidebar />
        </div>
        {/* Main content area */}
        <div className="flex-grow bg-background p-4">
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
