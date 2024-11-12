// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PaginatedTable from "@/components/Table/PaginatedTable"; // Assuming this component exists
// import Layout from "@/components/Layout1/Layout";
// import UserHeader from "@/components/Header/UserHeader";
// import FooterComponent from "@/components/Footer/footercomponent"; // Assuming this exists
// import { Box, Container } from "@mui/material"; // If you're using Material UI

// const UserRequests: React.FC = () => {
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 6;

//   // Fetch requests from the API
//   useEffect(() => {
//     const fetchUserRequests = async () => {
//       try {
//         const res = await axios.get("/api/request_personal", {
//           headers: { "Content-Type": "application/json" },
//         });
//         setRequests(res.data);
//       } catch (error) {
//         setError(
//           error.response?.data?.error || "An unexpected error occurred."
//         );
//       }
//     };

//     fetchUserRequests();
//   }, []);

//   // Pagination logic
//   const totalPages = Math.ceil(requests.length / itemsPerPage);
//   const paginatedRequests = requests.slice(
//     currentPage * itemsPerPage,
//     currentPage * itemsPerPage + itemsPerPage
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   // Function to get service name from serviceId
//   const getServiceNameById = (serviceId: string) => {
//     // Mock service data - replace with actual service data from your API
//     const services = [
//       { _id: "1", serviceName: "Service 1" },
//       { _id: "2", serviceName: "Service 2" },
//     ];
//     const service = services.find((service) => service._id === serviceId);
//     return service ? service.serviceName : "Unknown Service";
//   };

//   return (
//     <Box display="flex" flexDirection="column" minHeight="100vh">
//       <UserHeader />
//       <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
//         <div className="p-6 bg-gray-100 min-h-screen">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Requests</h2>
//           {error && <p className="text-red-500">{error}</p>}
//           {requests.length === 0 ? (
//             <p className="text-gray-600">No requests found.</p>
//           ) : (
//             <PaginatedTable
//               data={paginatedRequests}
//               currentPage={currentPage}
//               totalPages={totalPages}
//               handleNextPage={handleNextPage}
//               handlePreviousPage={handlePreviousPage}
//               getServiceNameById={getServiceNameById}
//             />
//           )}
//         </div>
//       </Container>
//       <FooterComponent />
//     </Box>
//   );
// };

// export default UserRequests;

// UserRequests.tsx

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginatedTable from "@/components/Table/PaginatedTable";
import Layout from "@/components/Layout1/Layout";
import UserHeader from "@/components/Header/UserHeader";
import FooterComponent from "@/components/Footer/footercomponent";
import { Box, Container } from "@mui/material";

const UserRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const itemsPerPage = 6;

  // Fetch requests from the API
  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const res = await axios.get("/api/request_personal", {
          headers: { "Content-Type": "application/json" },
        });
        setRequests(res.data);
      } catch (error) {
        setError(error.response?.data?.error || "An unexpected error occurred.");
      }
    };

    fetchUserRequests();
  }, []);

  // Update status
  const updateStatus = async (requestId: string, newStatus: string) => {
    setStatusUpdating(true);
    try {
      await axios.put(`/api/request_personal/${requestId}`, { status: newStatus });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      setError("Failed to update status. Please try again.");
    } finally {
      setStatusUpdating(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to get service name from serviceId
  const getServiceNameById = (serviceId: string) => {
    const services = [
      { _id: "1", serviceName: "Service 1" },
      { _id: "2", serviceName: "Service 2" },
    ];
    const service = services.find((service) => service._id === serviceId);
    return service ? service.serviceName : "Unknown Service";
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <UserHeader />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Requests</h2>
          {error && <p className="text-red-500">{error}</p>}
          {requests.length === 0 ? (
            <p className="text-gray-600">No requests found.</p>
          ) : (
            <PaginatedTable
              data={paginatedRequests}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              updateStatus={updateStatus}
              statusUpdating={statusUpdating}
              getServiceNameById={getServiceNameById}
            />
          )}
        </div>
      </Container>
      <FooterComponent />
    </Box>
  );
};

export default UserRequests;
