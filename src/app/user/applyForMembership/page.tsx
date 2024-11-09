// "use client";
// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";

// // Define types for the session and user
// interface User {
//   role: string;
//   membershipStatus: string;
// }

// interface Session {
//   user: User;
// }

// const ApplyForMembership: React.FC = () => {
//   const { data: session } = useSession() as { data: Session | null };
//   const [status, setStatus] = useState<string | undefined>(
//     session?.user?.membershipStatus
//   );
//   const [loading, setLoading] = useState<boolean>(false);

//   // Effect to update status if session changes
//   useEffect(() => {
//     if (session) {
//       setStatus(session.user.membershipStatus);
//     }
//   }, [session]);
//   console.log(session,"this is my session")

//   const applyForMembership = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/membership/apply", { method: "POST" });

//       if (!res.ok) {
//         throw new Error("Failed to submit application");
//       }

//       setStatus("Pending");
//       alert("Request submitted");
//     } catch (error) {
//       alert(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (session?.user?.role !== "user") {
//     return null; // Render nothing if the user is not a regular user
//   }

//   if (status === "Pending") {
//     return <p>Request under review</p>;
//   }

//   if (status !== "Approved") {
//     return (
//       <button onClick={applyForMembership} disabled={loading}>
//         {loading ? "Submitting..." : "Apply for Membership"}
//       </button>
//     );
//   }

//   return null; // Render nothing if the user is already approved
// };

// export default ApplyForMembership;

// components/ApplyForMembership.tsx
// components/ApplyForMembership.tsx
"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import socket from "../../../../socket"; // Import the socket instance

interface User {
  role: string;
  membershipStatus: string;
}

interface Session {
  user: User;
}

const ApplyForMembership: React.FC = () => {
  const { data: session } = useSession() as { data: Session | null };
  const [status, setStatus] = useState<string | undefined>(
    session?.user?.membershipStatus
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([]); // Notifications

  useEffect(() => {
    if (session) {
      setStatus(session.user.membershipStatus);
    }
  }, [session]);

  // Listen for application response from admin
  useEffect(() => {
    socket.on("applicationResponse", (response) => {
      const message = `Your application has been ${response.action}`;
      alert(message);
      setStatus(response.action === "approved" ? "Approved" : "Pending");
      console.log(message); // Log response
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.off("applicationResponse");
    };
  }, []);

  const applyForMembership = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/membership/apply", { method: "POST" });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      setStatus("Pending");
      const notification = "Application submitted and pending approval.";
      alert(notification);
      console.log(notification);
      setNotifications((prev) => [...prev, notification]);

      // Emit event to notify admins
      socket.emit("applyForMembership", {
        id: session?.user?.id,
        username: session?.user.name,
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.role !== "user") {
    return null; // Render nothing if the user is not a regular user
  }

  return (
    <div>
      {status === "Pending" ? (
        <p>Request under review</p>
      ) : status !== "Approved" ? (
        <button onClick={applyForMembership} disabled={loading}>
          {loading ? "Submitting..." : "Apply for Membership"}
        </button>
      ) : null}

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

export default ApplyForMembership;
