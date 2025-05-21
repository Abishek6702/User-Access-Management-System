import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import RequestTable from "./RequestTable";
import ReasonModal from "./ReasonModal";

function ManagerDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [decisionLoading, setDecisionLoading] = useState({});
  const [reasonModal, setReasonModal] = useState({ open: false, reason: "" });

  // fetch all the requests 
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRequests(res.data);
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // to check the status either accept or reject
  const handleDecision = async (id, status) => {
    setDecisionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/requests/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await fetchRequests();
    } catch (err) {}
    setDecisionLoading((prev) => ({ ...prev, [id]: false }));
  };

  const handleShowReason = (reason) => setReasonModal({ open: true, reason });
  const handleCloseModal = () => setReasonModal({ open: false, reason: "" });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <RequestTable
              requests={requests}
              onShowReason={handleShowReason}
              onApprove={(id) => handleDecision(id, "Approved")}
              onReject={(id) => handleDecision(id, "Rejected")}
              decisionLoading={decisionLoading}
            />
          )}
        </div>
      </div>
      <ReasonModal
        isOpen={reasonModal.open}
        reason={reasonModal.reason}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default ManagerDashboard;
