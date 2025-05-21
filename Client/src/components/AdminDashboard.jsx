import React, { useEffect, useState } from "react";
import axios from "axios";
import SoftwareTable from "./SoftwareTable";
import SoftwareForm from "./SoftwareForm";
import ConfirmModal from "./ConfirmModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

function AdminDashboard() {
  const [softwares, setSoftwares] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevels: [], 
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

 
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // fetches list of software avilable
  const fetchSoftwares = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/software`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (Array.isArray(res.data)) {
        setSoftwares(res.data);
      } else if (res.data && Array.isArray(res.data.softwares)) {
        setSoftwares(res.data.softwares);
      } else {
        setSoftwares([]);
      }
    } catch (err) {
      setError("Failed to fetch software list.");
      setSoftwares([]);
    }
  };

  useEffect(() => {
    fetchSoftwares();
  }, []);

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "accessLevels") {
      setForm((prev) => {
        let newLevels = prev.accessLevels || [];
        if (checked) {
          newLevels = [...newLevels, value];
        } else {
          newLevels = newLevels.filter((lvl) => lvl !== value);
        }
        return { ...prev, accessLevels: newLevels };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  // create new software and edit the exixiting software
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      accessLevels: form.accessLevels, 
    };
    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/software/${editId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Software updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/software`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Software created successfully!");
      }
      setForm({ name: "", description: "", accessLevels: [] });
      setEditId(null);
      setModalOpen(false);
      fetchSoftwares();
    } catch (err) {
      setError("Failed to save software. " + (err.response?.data?.msg || ""));
      toast.error(
        "Failed to save software. " + (err.response?.data?.msg || "")
      );
    }
  };

  const handleEdit = (sw) => {
    setEditId(sw.id);
    setForm({
      name: sw.name,
      description: sw.description,
      accessLevels: Array.isArray(sw.accessLevels)
        ? sw.accessLevels
        : typeof sw.accessLevels === "string"
        ? sw.accessLevels.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    });
    setModalOpen(true);
  };


  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // to delete particular software
  const confirmDelete = async () => {
    setError("");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/software/${deleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchSoftwares();
      toast.success("Software deleted successfully!");
    } catch (err) {
      setError("Failed to delete software.");
      toast.error("Failed to delete software.");
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleCreate = () => {
    setEditId(null);
    setForm({ name: "", description: "", accessLevels: [] });
    setModalOpen(true);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: "", description: "", accessLevels: [] });
    setModalOpen(false);
    setError("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 mt-12">
        <ToastContainer position="top-right" />
        <div className="max-w-[90%] mx-auto ">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors shadow cursor-pointer"
            >
              + Add Software
            </button>
          </div>
          <SoftwareTable
            softwares={softwares}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <SoftwareForm
            open={modalOpen}
            form={form}
            editId={editId}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
          <ConfirmModal
            open={confirmOpen}
            onConfirm={confirmDelete}
            onCancel={() => setConfirmOpen(false)}
            message="Are you sure you want to delete this software?"
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
