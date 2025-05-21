import React from "react";

function StatusBadge({ status }) {
  let colorClass = "";
  let text = status;
  switch (status) {
    case "Approved":
      colorClass = "bg-green-100 text-green-700";
      break;
    case "Rejected":
      colorClass = "bg-red-100 text-red-700";
      break;
    case "Pending":
    default:
      colorClass = "bg-yellow-100 text-yellow-700";
      text = "Pending";
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {text}
    </span>
  );
}

export default function UserRequestTable({ requests }) {
  if (!requests.length)
    return (
      <div className="text-center text-gray-400">No requests found.</div>
    );
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Software</th>
            <th className="py-3 px-4 text-left">Access Type</th>
            <th className="py-3 px-4 text-left">Reason</th>
            <th className="py-3 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 ">{req.software?.name}</td>
              <td className="py-3 px-4">{req.accessType}</td>
              <td className="py-3 px-4">{req.reason}</td>
              <td className="py-3 px-4 text-center">
                <StatusBadge status={req.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
