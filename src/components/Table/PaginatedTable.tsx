import React from "react";

const PaginatedTable = ({
  data,
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  updateStatus,
  statusUpdating,
  getServiceNameById,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-5">
      <div className="max-h-[400px] min-h-[400px] overflow-y-hidden">
        <table className="w-full text-sm bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-yellow-600 text-white">
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Room Number</th>
              <th className="p-4 text-left font-semibold">Service Name</th>
              <th className="p-4 text-left font-semibold">Description</th>
              <th className="p-4 text-left font-semibold">Date</th>
              <th className="p-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr
                key={request._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-4 text-gray-800">
                  {request.username || "Unknown"}
                </td>
                <td className="p-4 text-gray-800">{request.roomNumber}</td>
                <td className="p-4 text-gray-800">
                  {getServiceNameById(request.serviceId)}
                </td>
                <td className="p-4 text-gray-800">{request.description}</td>
                <td className="p-4 text-gray-600">
                  {new Date(request.requestDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <select
                    className="w-full p-2 text-center rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500
                              appearance-none transition-colors duration-150 ease-in-out
                              bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                    value={request.status}
                    onChange={(e) => updateStatus(request._id, e.target.value)}
                    disabled={statusUpdating}
                  >
                    <option value="pending" className="bg-white text-gray-700">
                      Pending
                    </option>
                    <option
                      value="in_progress"
                      className="bg-white text-gray-700"
                    >
                      In Progress
                    </option>
                    <option
                      value="completed"
                      className="bg-white text-gray-700"
                    >
                      Completed
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-full ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded-full ${
            currentPage === totalPages - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
