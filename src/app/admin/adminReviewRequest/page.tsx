// "use client"
// import React, { useEffect, useState } from "react";

// // Define a type for the request data
// interface Request {
//   _id: string;
//   name: string;
//   email: string;
// }

// const AdminReviewRequests: React.FC = () => {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch("/api/getPendingRequests");
//         if (!res.ok) {
//           throw new Error("Failed to fetch requests");
//         }
//         const data = await res.json();
//         setRequests(data.requests);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleAction = async (userId: string, action: "approve" | "reject") => {
//     try {
//       const res = await fetch("/api/membership/review", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, action }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to process request");
//       }

//       alert(`Request ${action === "approve" ? "approved" : "rejected"}`);
//       setRequests((prevRequests) =>
//         prevRequests.filter((request) => request._id !== userId)
//       );
//     } catch (err) {
//       alert(err instanceof Error ? err.message : "An unknown error occurred");
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h2>Pending Membership Requests</h2>
//       {requests.length > 0 ? (
//         requests.map((request) => (
//           <div key={request._id}>
//             <p>
//               {request.name} - {request.email}
//             </p>
//             <button onClick={() => handleAction(request._id, "approve")}>
//               Approve
//             </button>
//             <button onClick={() => handleAction(request._id, "reject")}>
//               Reject
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No pending requests</p>
//       )}
//     </div>
//   );
// };

// export default AdminReviewRequests;

// components/AdminReviewRequests.tsx
// components/AdminReviewRequests.tsx
"use client";
import React, { useEffect, useState } from "react";
import socket from "../../../../socket"; // Import the socket instance

interface Request {
  _id: string;
  name: string;
  email: string;
}

const AdminReviewRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]); // For tracking notifications

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/getPendingRequests");
        if (!res.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await res.json();
        setRequests(data.requests);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    // Listen for new applications
    socket.on("newApplication", (data) => {
      setRequests((prevRequests) => [...prevRequests, data]);
      const notification = `New application received: ${data.name}`;
      console.log(notification);
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("newApplication");
    };
  }, []);

  const handleAction = async (userId: string, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/membership/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      if (!res.ok) {
        throw new Error("Failed to process request");
      }

      alert(`Request ${action === "approve" ? "approved" : "rejected"}`);

      // Emit response back to user
      socket.emit("respondToApplication", { userId, action });

      const notification = `Request ${
        action === "approve" ? "approved" : "rejected"
      } for user ID ${userId}`;
      console.log(notification);
      setNotifications((prev) => [...prev, notification]);

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== userId)
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Pending Membership Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id}>
            <p>
              {request.name} - {request.email}
            </p>
            <button onClick={() => handleAction(request._id, "approve")}>
              Approve
            </button>
            <button onClick={() => handleAction(request._id, "reject")}>
              Reject
            </button>
          </div>
        ))
      ) : (
        <p>No pending requests</p>
      )}

      {/* Display notifications */}
      <div>
        <h3>Notifications</h3>
        {notifications.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminReviewRequests;
