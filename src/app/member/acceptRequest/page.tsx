// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

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
//         const res = await axios.get("/api/request/accept", {
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

//   const updateStatus = async (requestId, newStatus) => {
//     setStatusUpdating(true);
//     try {
//       const res = await axios.patch("/api/request/accept", {
//         requestId,
//         newStatus,
//       });
//       const updatedRequest = res.data.updatedRequest;
//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req._id === updatedRequest._id ? updatedRequest : req
//         )
//       );
//       setError("");
//     } catch (error) {
//       setError(error.response?.data?.error || "Failed to update status.");
//     } finally {
//       setStatusUpdating(false);
//     }
//   };

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
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Team Requests</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {requests.length === 0 ? (
//         <p className="text-gray-600">No requests found for your team.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-5">
//           <div
//             className="max-h-[400px] min-h-[400px] overflow-y-hidden" // Fixed height for stable layout
//           >
//             <table className="w-full text-sm bg-white rounded-lg overflow-hidden">
//               <thead>
//                 <tr className="bg-yellow-600 text-white">
//                   <th className="p-4 text-left font-semibold">Name</th>
//                   <th className="p-4 text-left font-semibold">Room Number</th>
//                   <th className="p-4 text-left font-semibold">Service Name</th>
//                   <th className="p-4 text-left font-semibold">Description</th>
//                   <th className="p-4 text-left font-semibold">Date</th>
//                   <th className="p-4 text-left font-semibold">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRequests.map((request, index) => (
//                   <tr
//                     key={request._id}
//                     className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                   >
//                     <td className="p-4 text-gray-800">Tashi Wangchuk</td>
//                     <td className="p-4 text-gray-800">{request.roomNumber}</td>
//                     <td className="p-4 text-gray-800">
//                       {getServiceNameById(request.serviceId)}
//                     </td>
//                     <td className="p-4 text-gray-800">{request.description}</td>
//                     <td className="p-4 text-gray-600">
//                       {new Date(request.requestDate).toLocaleDateString()}
//                     </td>
//                     <td className="p-4">
//                       <select
//                         className="w-full p-2 text-center rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500
//                                    appearance-none transition-colors duration-150 ease-in-out
//                                   bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
//                         value={request.status}
//                         onChange={(e) =>
//                           updateStatus(request._id, e.target.value)
//                         }
//                         disabled={statusUpdating}
//                       >
//                         <option
//                           value="pending"
//                           className="bg-white text-gray-700"
//                         >
//                           Pending
//                         </option>
//                         <option
//                           value="in_progress"
//                           className="bg-white text-gray-700"
//                         >
//                           In Progress
//                         </option>
//                         <option
//                           value="completed"
//                           className="bg-white text-gray-700"
//                         >
//                           Completed
//                         </option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 0}
//               className={`px-4 py-2 rounded-full ${
//                 currentPage === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-yellow-500 text-white hover:bg-yellow-600"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="text-gray-600">
//               Page {currentPage + 1} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages - 1}
//               className={`px-4 py-2 rounded-full ${
//                 currentPage === totalPages - 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-yellow-500 text-white hover:bg-yellow-600"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginatedTable from "@/components/Table/PaginatedTable";

function TeamRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [services, setServices] = useState([]);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTeamRequests = async () => {
      try {
        const res = await axios.get("/api/request/accept", {
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
  }, []);

  const updateStatus = async (requestId, newStatus) => {
    setStatusUpdating(true);
    try {
      const res = await axios.patch("/api/request/accept", {
        requestId,
        newStatus,
      });
      const updatedRequest = res.data.updatedRequest;
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === updatedRequest._id ? updatedRequest : req
        )
      );
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  const getServiceNameById = (serviceId) => {
    const service = services.find((service) => service._id === serviceId);
    return service ? service.serviceName : "Unknown Service";
  };

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Team Requests</h2>
      {error && <p className="text-red-500">{error}</p>}
      {requests.length === 0 ? (
        <p className="text-gray-600">No requests found for your team.</p>
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
  );
}

export default TeamRequests;
