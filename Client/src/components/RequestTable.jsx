import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

function StatusBadge({ status }) {
  if (status === "Pending")
    return (
      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
        Pending
      </span>
    );
  if (status === "Approved")
    return (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
        Approved
      </span>
    );
  if (status === "Rejected")
    return (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
        Rejected
      </span>
    );
  return null;
}

export default function RequestTable({
  requests,
  onShowReason,
  onApprove,
  onReject,
  decisionLoading,
}) {
  if (!requests.length)
    return <div className="text-center text-gray-400">No requests.</div>;

  return (
    <div className="overflow-x-auto rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">Request Available</h2>
      <table className="min-w-full tab bg-white   ">
        <thead className="">
          <tr className="bg-gray-100 text-gray-700 text-sm ">
            <th className="py-3 px-4 text-center">User</th>
            <th className="py-3 px-4 text-center">Software</th>
            <th className="py-3 px-4 text-center">Access Type</th>
            <th className="py-3 px-4 text-center">Reason</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr
              key={req.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 font-medium text-gray-800 text-center">
                {req.user.username}
              </td>
              <td className="py-3 px-4 text-center">{req.software.name}</td>
              <td className="py-3 px-4 text-center">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {req.accessType}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  className="inline-flex items-center gap-1 text-green-700 hover:text-green-900"
                  onClick={() => onShowReason(req.reason)}
                  title="View Reason"
                >
                  <IoInformationCircleOutline className="text-xl" />
                  <span className="sr-only">View Reason</span>
                </button>
              </td>
              <td className="py-3 px-4 text-center">
                <StatusBadge status={req.status} />
              </td>
              <td className="py-3 px-4 text-center">
                {req.status === "Pending" ? (
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => onApprove(req.id)}
                      disabled={decisionLoading[req.id]}
                      className={`
      rounded-full p-1
      focus:outline-none focus:ring-2 focus:ring-green-300
      ${decisionLoading[req.id] ? "opacity-60" : "hover:scale-110"}
    `}
                      title="Approve"
                      aria-label="Approve"
                    >
                      <IoCheckmarkCircleOutline className="text-green-600 hover:text-green-700 text-2xl" />
                    </button>
                    <button
                      onClick={() => onReject(req.id)}
                      disabled={decisionLoading[req.id]}
                      className={`
      rounded-full p-1
      focus:outline-none focus:ring-2 focus:ring-red-300
      
      ${decisionLoading[req.id] ? "opacity-60" : "hover:scale-110"}
    `}
                      title="Reject"
                      aria-label="Reject"
                    >
                      <IoCloseCircleOutline className="text-red-500 hover:text-red-700 text-2xl" />
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
