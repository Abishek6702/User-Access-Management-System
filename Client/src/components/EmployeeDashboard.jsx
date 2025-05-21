import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RequestAccessModal from "./RequestAccessModal";
import Navbar from "./Navbar";
import RequestTable from "./RequestTable"; 
import UserRequestTable from "./UserRequesttable";

const TABS = [
  { label: "Softwares Available", value: "softwares" },
  { label: "My Requests", value: "requests" },
];

function EmployeeDashboard() {
  const [softwares, setSoftwares] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("softwares");
  const [loading, setLoading] = useState(false);

  // Fetch softwares
  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/software`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSoftwares(
          Array.isArray(res.data) ? res.data : res.data.softwares || []
        );
      } catch {
        toast.error("Failed to fetch software list.");
      }
    };
    fetchSoftwares();
  }, []);

  // Fetch requests for the logged-in user
  useEffect(() => {
    if (activeTab === "requests") {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/requests/mine`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setRequests(Array.isArray(res.data) ? res.data : res.data.requests || []);
        })
        .catch(() => toast.error("Failed to fetch your requests."))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const handleOpenModal = (software) => {
    setSelectedSoftware(software);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSoftware(null);
  };

  // submit new requests
  const handleRequestSubmit = async (formData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/requests`,
        { ...formData, softwareId: Number(formData.softwareId) },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Request submitted successfully!");
      handleCloseModal();
      if (activeTab === "requests") {
      
        setActiveTab("softwares");
        setTimeout(() => setActiveTab("requests"), 100);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Request failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-10">
          <div className="flex mb-8 gap-4">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={`py-2 px-6 font-semibold transition-colors border rounded-lg  ${
                  activeTab === tab.value
                    ? "border-green-600  bg-green-600 text-white"
                    : "border-gray-600 text-gray-500 hover:text-green-600"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "softwares" && (
            <>
              
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {softwares.length ? (
                  softwares.map((software) => (
                    <div
                      key={software.id}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {software.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {software.description || "No description available."}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {software.accessLevels?.map((level) => (
                            <span
                              key={level}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenModal(software)}
                        className="mt-6 py-2 bg-green-600 cursor-pointer text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
                      >
                        Request Access
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No software available.
                  </div>
                )}
              </div>
              <RequestAccessModal
                isOpen={isModalOpen}
                software={selectedSoftware}
                onClose={handleCloseModal}
                onSubmit={handleRequestSubmit}
              />
            </>
          )}

          {activeTab === "requests" && (
            <div>
              
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : (
                <UserRequestTable requests={requests} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;
