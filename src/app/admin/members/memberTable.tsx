// "use client";

// import React, { useEffect, useState } from "react";
// import { Membership, columns } from "@/components/Tables/membership/columns";
// import { DataTable } from "@/components/Tables/membership/data_table";
// import { StatCardProps, StatCard } from "@/components/StatCard/statCard";

// export default function MemberTable() {
// 	const [data, setData] = useState<Membership[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const [cards, setCards] = useState<StatCardProps[]>([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch("/api/members", {
// 					method: "GET",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				});

// 				if (!response.ok) {
// 					throw new Error(`Error: ${response.status}`);
// 				}

// 				const members = await response.json();
// 				const filteredMembers = members.filter(
// 					(member: any) =>
// 						// member.membership_request_status === "active" ||
// 						member.membership_request_status === "pending"
// 				);

// 				const formattedData = filteredMembers.map((member: any) => ({
// 					id: member._id,
// 					name: member.name,
// 					email: member.email,
// 					phone: member.phoneNumber,
// 					role: member.role,
// 					status: member.status,
// 					student_no: member.studentNumber,
// 					date_of_joining: new Date(),
// 					membership_request_status: member.membership_request_status,
// 					image: member.profileImage || "/images/logo/logo.png",
// 					department: member.department,
// 				}));

// 				setData(formattedData);
// 				setLoading(false);
// 			} catch (error) {
// 				setError("Failed to fetch members");
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	// This useEffect will run whenever `data` changes and update `cards` accordingly
// 	useEffect(() => {
// 		const cardData: StatCardProps[] = [
// 			{
// 				icon: "tdesign:member",
// 				color: "#3FD97F",
// 				title: "Total Members",
// 				value: data
// 					.filter(
// 						(member: { membership_request_status: string }) =>
// 							member.membership_request_status !== "not_accepted"
// 					)
// 					.length.toString(),

// 				growthRate: 0,
// 			},
// 			{
// 				icon: "mdi:account-online-outline",
// 				color: "#3FD97F",
// 				title: "Active Members",
// 				value: data
// 					.filter((member) => member.status === "active")
// 					.length.toString(),
// 				growthRate: data.filter((member) => member.status === "active").length,
// 			},
// 			{
// 				icon: "mdi:account-pending-outline",
// 				color: "#3FD97F",
// 				title: "Pending Members",
// 				value: data
// 					.filter((member) => member.membership_request_status === "pending")
// 					.length.toString(),
// 				growthRate: data.filter(
// 					(member) => member.membership_request_status === "pending"
// 				).length,
// 			},
// 		];

// 		setCards(cardData);
// 	}, [data]); // Re-run whenever `data` changes

// 	const handleStatusChange = async (
// 		updatedItem: any,
// 		newStatus: "Joined" | "Pending" | "Remove"
// 	) => {
// 		console.log("Updated", updatedItem);
// 		console.log("New Status", newStatus);

// 		// Modify the updatedItem based on the new status
// 		if (newStatus === "Joined") {
// 			updatedItem.membership_request_status = "active"; // Update status
// 			updatedItem.date_of_joining = new Date(); // Set the join date
// 			updatedItem.role = "member"; // Update the role
// 		} else if (newStatus === "Remove") {
// 			updatedItem.membership_request_status = "not_accepted"; // Update status
// 			updatedItem.role = "user";
// 			// Update role to 'user'
// 		}

// 		try {
// 			const response = await fetch(`/api/members/${updatedItem.id}`, {
// 				method: "PUT",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(updatedItem), // Send updated item with new status
// 			});

// 			if (!response.ok) {
// 				throw new Error(`Failed to update status: ${response.status}`);
// 			}

// 			// Successfully updated, get the updated member data
// 			const updatedMember = await response.json();

// 			//Update the local state to reflect the updated member info
// 			setData((prevData) =>
// 				prevData.map((member) =>
// 					(member.membership_request_status === "active" ||
// 						member.membership_request_status === "pending") &&
// 					member.membership_request_status ===
// 						updatedMember.membership_request_status
// 						? updatedItem
// 						: member
// 				)
// 			);

// 			console.log(data);
// 		} catch (error) {
// 			console.error("Error updating status:", error);
// 		}
// 	};

// 	const handleAddMember = async (addMember: any) => {
// 		console.log("added member", addMember);

// 		// Update member's status and role before sending to the API
// 		addMember.membership_request_status = "active"; // Update status
// 		addMember.date_of_joining = new Date(); // Set the join date
// 		addMember.role = "member"; // Update the role

// 		try {
// 			const response = await fetch(`/api/members/${addMember._id}`, {
// 				method: "PUT",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(addMember), // Send updated item with new status
// 			});

// 			if (!response.ok) {
// 				throw new Error(`Failed to update status: ${response.status}`);
// 			}

// 			// Successfully updated, get the updated member data
// 			const updatedMember = await response.json();
// 			(updatedMember.image = addMember.image || "/images/logo/logo.png"),
// 				(updatedMember.date_of_joining = new Date(
// 					updatedMember.date_of_joining
// 				));
// 			// Add the updated member to the local state
// 			setData((prevData) => {
// 				// Find and remove the old version of the member, if it exists
// 				const updatedData = prevData.filter(
// 					(member) => member.id !== updatedMember._id
// 				);
// 				// Add the updated member to the data
// 				return [...prevData, updatedMember];
// 			});
// 		} catch (error) {
// 			console.error("Error updating status:", error);
// 		}
// 	};

// 	const handleRemoveMember = async (id: string) => {
// 		try {
// 			const response = await fetch(`/api/members/${id}`, {
// 				method: "DELETE",
// 			});

// 			if (response.ok) {
// 				setData(data.filter((member) => member.id !== id)); // Update data without the removed member
// 			} else {
// 				console.error("Failed to delete member");
// 			}
// 		} catch (error) {
// 			console.error("Error deleting member:", error);
// 		}
// 	};

// 	return (
// 		<div className="container mx-auto">
// 			<h4 className="font-semibold text-xl mb-4">Maintenance Club Members</h4>

// 			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7.5">
// 				{cards.map((card, index) => (
// 					<StatCard
// 						key={index}
// 						icon={card.icon}
// 						color={card.color}
// 						title={card.title}
// 						value={card.value}
// 						growthRate={card.growthRate}
// 					/>
// 				))}
// 			</div>

// 			{loading && <p>Loading...</p>}
// 			{error && <p className="text-red-500">{error}</p>}
// 			<div className="bg-white mt-8 p-4 rounded-lg">
// 				<DataTable
// 					columns={columns}
// 					data={data.filter(
// 						(member: { membership_request_status: string }) =>
// 							member.membership_request_status !== "not_accepted"
// 					)}
// 					onRemoveMember={handleRemoveMember}
// 					onStatusChange={handleStatusChange}
// 					onAddMember={handleAddMember}
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { Membership, columns } from "@/components/Tables/membership/columns";
// import { DataTable } from "@/components/Tables/membership/data_table";
// import { StatCardProps, StatCard } from "@/components/StatCard/statCard";

// export default function MemberTable() {
//   const [data, setData] = useState<Membership[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [cards, setCards] = useState<StatCardProps[]>([]);

//   // Fetching data and organizing it
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/getPendingRequest", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const members = await response.json();
//         const pendingMembers = members.requests.filter(
//           (member: any) => member.membership_request_status === "pending"
//         );
//         const activeMembers = members.requests.filter(
//           (member: any) => member.membership_request_status === "active"
//         );

//         const formattedData = [...pendingMembers, ...activeMembers].map(
//           (member: any) => ({
//             id: member._id,
//             name: member.name,
//             email: member.email,
//             phone: member.phoneNumber,
//             role: member.role,
//             status: member.membership_request_status,
//             student_no: member.studentNumber,
//             date_of_joining: new Date(),
//             image: member.profileImage || "/images/logo/logo.png",
//             department: member.department,
//           })
//         );

//         setData(formattedData);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch members");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Cards data update
//   useEffect(() => {
//     const cardData: StatCardProps[] = [
//       {
//         icon: "tdesign:member",
//         color: "#3FD97F",
//         title: "Total Members",
//         value: data
//           .filter((member) => member.status !== "not_accepted")
//           .length.toString(),
//         growthRate: 0,
//       },
//       {
//         icon: "mdi:account-online-outline",
//         color: "#3FD97F",
//         title: "Active Members",
//         value: data
//           .filter((member) => member.status === "active")
//           .length.toString(),
//         growthRate: data.filter((member) => member.status === "active").length,
//       },
//       {
//         icon: "mdi:account-pending-outline",
//         color: "#3FD97F",
//         title: "Pending Members",
//         value: data
//           .filter((member) => member.status === "pending")
//           .length.toString(),
//         growthRate: data.filter((member) => member.status === "pending").length,
//       },
//     ];

//     setCards(cardData);
//   }, [data]);

//   // Handling the status change for members
//   const handleStatusChange = async (
//     updatedItem: any,
//     newStatus: "Joined" | "Pending" | "Remove"
//   ) => {
//     let action = "";
//     if (newStatus === "Joined") {
//       action = "approve";
//     } else if (newStatus === "Remove") {
//       action = "reject";
//     }

//     try {
//       const response = await fetch("/api/membership/review", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId: updatedItem.id, action }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update status: ${response.status}`);
//       }

//       const result = await response.json();
//       alert(result.message);

//       // Update local data to reflect new status
//       setData((prevData) =>
//         prevData.map((member) =>
//           member.id === updatedItem.id
//             ? {
//                 ...member,
//                 status: action === "approve" ? "active" : "not_accepted",
//                 role: action === "approve" ? "member" : "user",
//               }
//             : member
//         )
//       );
//     } catch (error) {
//       setError("Failed to update member status. Please try again later.");
//       console.error("Error updating status:", error);
//     }
//   };

//   // Handling the removal of a member
//   const handleRemoveMember = async (id: string) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this member?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`/api/members/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setData(data.filter((member) => member.id !== id));
//       } else {
//         setError("Failed to delete member.");
//       }
//     } catch (error) {
//       setError("Error deleting member. Please try again.");
//       console.error("Error deleting member:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <h4 className="font-semibold text-xl mb-4">Maintenance Club Members</h4>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7.5">
//         {cards.map((card, index) => (
//           <StatCard
//             key={index}
//             icon={card.icon}
//             color={card.color}
//             title={card.title}
//             value={card.value}
//             growthRate={card.growthRate}
//           />
//         ))}
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="bg-white mt-8 p-4 rounded-lg">
//         <DataTable
//           columns={columns}
//           data={data.filter((member) => member.status !== "not_accepted")}
//           onStatusChange={handleStatusChange}
//           onRemoveMember={handleRemoveMember}
//         />
//       </div>
//     </div>
//   );
// }

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
