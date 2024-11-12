

"use client";
import React, { useEffect, useState } from "react";
import socket from "../../../../socket"; // Import the socket instance

interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  membership_request_status: string;
  studentNumber: string;
  profileImage: string;
  department: string;
}

const AdminReviewRequests: React.FC = () => {
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);
  const [activeMembers, setActiveMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/getPendingRequests");
        if (!res.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await res.json();
        setPendingMembers(data.pendingRequests);
        setActiveMembers(data.activeRequests);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    socket.on("newApplication", (data) => {
      setPendingMembers((prevRequests) => [...prevRequests, data]);
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

      if (action === "approve") {
        const approvedMember = pendingMembers.find(
          (member) => member._id === userId
        );

        if (approvedMember) {
          // Update the status locally to 'active' and add to activeMembers list
          approvedMember.membership_request_status = "active";

          setActiveMembers((prevMembers) => [...prevMembers, approvedMember]);
          setPendingMembers((prevRequests) =>
            prevRequests.filter((request) => request._id !== userId)
          );
        }
      } else {
        // For rejection, simply remove from pending list
        setPendingMembers((prevRequests) =>
          prevRequests.filter((request) => request._id !== userId)
        );
      }

      // Emit response back to user
      socket.emit("respondToApplication", { userId, action });
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handleRemove = async (userId: string) => {
    try {
      const res = await fetch("/api/membership/review", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark user as not accepted");
      }

      alert("User marked as not accepted");

      // Update active members list locally
      setActiveMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== userId)
      );

      // Emit the removal response back to user
      socket.emit("respondToApplication", { userId, action: "remove" });
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  const formattedData = [...pendingMembers, ...activeMembers].map((member) => ({
    id: member._id,
    name: member.name,
    email: member.email,
    phone: member.phoneNumber,
    status: member.membership_request_status,
    student_no: member.studentNumber,
    date_of_joining: new Date(),
    image: member.profileImage || "/images/logo/logo.png",
    department: member.department,
  }));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Membership Requests
      </h2>

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((member) => (
            <tr
              key={member.id}
              className="hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <td className="py-3 px-4">{member.name}</td>
              <td className="py-3 px-4">{member.email}</td>
              <td className="py-3 px-4">{member.phone}</td>
              <td className="py-3 px-4">{member.status}</td>
              <td className="py-3 px-4">
                {member.status === "pending" && (
                  <select
                    onChange={(e) =>
                      handleAction(
                        member.id,
                        e.target.value as "approve" | "reject"
                      )
                    }
                    className="px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Action</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                  </select>
                )}
                {member.status === "active" && (
                  <button
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleRemove(member.id)}
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewRequests;
