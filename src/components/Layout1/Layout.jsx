"use client";
import MemberSidebar from "@/components/MemberSidebar/Sidebar";
import Header from "@/components/MemberHeader/index";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header at the top */}
      <Header />

      {/* Content below the header */}
      <div className="flex flex-grow overflow-hidden">
        
        {/* Sidebar with smooth scroll and a softer dark gray background */}
        <div className="w-40 h-full overflow-y-auto  text-white shadow-md">
          <MemberSidebar />
        </div>

        {/* Main content area with padding and scrollable content */}
        <div className="flex-grow p-4 bg-background overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
