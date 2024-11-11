"use client";
import MemberSidebar from "@/components/MemberSidebar/Sidebar";
import Header from "@/components/MemberHeader/index";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen ">
      {/* Header at the top */}
      <Header />
      {/* Content below the header */}
      <div className="flex flex-grow ">
        {/* Sidebar with a fixed width */}
        <div className="w-40">
          <MemberSidebar />
        </div>
        {/* Main content area */}
        <div className="flex-grow bg-background p-4">
          <main className="flex-grow">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
