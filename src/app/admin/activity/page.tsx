// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PaginatedTable from "@/components/Table/PaginatedTable";
// import Layout from "@/components/Layout1/Layout";

// function TeamRequests() {
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState("");
//   const [services, setServices] = useState([]);
//   const [statusUpdating, setStatusUpdating] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     const fetchTeamRequests = async () => {
//       try {
//         const res = await axios.get("/api/all_request", {
//           headers: { "Content-Type": "application/json" },
//         });
//         setRequests(res.data);
//       } catch (error) {
//         setError(
//           error.response?.data?.error || "An unexpected error occurred."
//         );
//       }
//     };

//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("/api/services");
//         setServices(res.data.services);
//       } catch (error) {
//         setError(error.response?.data?.error || "Failed to fetch services.");
//       }
//     };

//     fetchTeamRequests();
//     fetchServices();
//   }, []);

// //   const updateStatus = async (requestId, newStatus) => {
// //     setStatusUpdating(true);
// //     try {
// //       const res = await axios.patch("/api/all_request", {
// //         requestId,
// //         newStatus,
// //       });
// //       const updatedRequest = res.data.updatedRequest;
// //       setRequests((prevRequests) =>
// //         prevRequests.map((req) =>
// //           req._id === updatedRequest._id ? updatedRequest : req
// //         )
// //       );
// //       setError("");
// //     } catch (error) {
// //       setError(error.response?.data?.error || "Failed to update status.");
// //     } finally {
// //       setStatusUpdating(false);
// //     }
// //   };

//   const getServiceNameById = (serviceId) => {
//     const service = services.find((service) => service._id === serviceId);
//     return service ? service.serviceName : "Unknown Service";
//   };

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

//   return (
//     <Layout>
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Activity</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <PaginatedTable
//           data={paginatedRequests}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           handleNextPage={handleNextPage}
//           handlePreviousPage={handlePreviousPage}
//         //   updateStatus={updateStatus}
//         //   statusUpdating={statusUpdating}
//           getServiceNameById={getServiceNameById}
//         />
//       </div>
//     </Layout>
//   );
// }

// // export default TeamRequests;
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PaginatedTable from "@/components/Table/PaginatedTable";
// import Layout from "@/components/Layout1/Layout";

// function TeamRequests() {
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState("");
//   const [services, setServices] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 6;

//   // Fetch requests and services on component mount
//   useEffect(() => {
//     const fetchTeamRequests = async () => {
//       try {
//         const res = await axios.get("/api/all_request", {
//           headers: { "Content-Type": "application/json" },
//         });
//         setRequests(res.data);
//       } catch (error) {
//         setError(
//           error.response?.data?.error || "An unexpected error occurred."
//         );
//       }
//     };

//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("/api/services");
//         setServices(res.data.services);
//       } catch (error) {
//         setError(error.response?.data?.error || "Failed to fetch services.");
//       }
//     };

//     fetchTeamRequests();
//     fetchServices();
//   }, []);

//   // Get service name by ID
//   const getServiceNameById = (serviceId) => {
//     const service = services.find((service) => service._id === serviceId);
//     return service ? service.serviceName : "Unknown Service";
//   };

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

//   return (
//     <Layout>
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Activity</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <PaginatedTable
//           data={paginatedRequests}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           handleNextPage={handleNextPage}
//           handlePreviousPage={handlePreviousPage}
//           getServiceNameById={getServiceNameById}
//         />
//       </div>
//     </Layout>
//   );
// }

// export default TeamRequests;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginatedTable from "@/components/Table/PaginatedTable";
import Layout from "@/components/Layout1/Layout";

function TeamRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [userRole, setUserRole] = useState("member"); // assuming member by default or from context

  // Fetch requests and services on component mount
  useEffect(() => {
    const fetchTeamRequests = async () => {
      try {
        const res = await axios.get("/api/all_request", {
          headers: { "Content-Type": "application/json" },
        });
        setRequests(res.data);
      } catch (error) {
        setError(
          error.response?.data?.error || "An unexpected error occurred."
        );
      }
    };

    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/services");
        setServices(res.data.services);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch services.");
      }
    };

    fetchTeamRequests();
    fetchServices();

    // Assume we get the role from some authentication logic
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role); // This would be 'admin', 'user', or 'member'
    }
  }, []);

  // Get service name by ID
  const getServiceNameById = (serviceId) => {
    const service = services.find((service) => service._id === serviceId);
    return service ? service.serviceName : "Unknown Service";
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

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Activity</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <PaginatedTable
          data={paginatedRequests}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          getServiceNameById={getServiceNameById}
          userRole={userRole} // Pass the role here
        />
      </div>
    </Layout>
  );
}

export default TeamRequests;
