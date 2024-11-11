// components/ApplyForMembership.tsx
"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import socket from "../../../../socket"; // Import the socket instance

interface User {
  role: string;
  membership_request_status: string;
}

interface Session {
  user: User;
}

const ApplyForMembership: React.FC = () => {
  const { data: session } = useSession() as { data: Session | null };
  const [status, setStatus] = useState<string | undefined>(
    session?.user?.membership_request_status
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([]); // Notifications

  useEffect(() => {
    if (session) {
      setStatus(session.user.membership_request_status);
    }
  }, [session]);


  const applyForMembership = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/membership/apply", { method: "POST" });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      setStatus("pending");
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
      {status === "pending" ? (
        <p>Request under review</p>
      ) : status !== "active" ? (
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
