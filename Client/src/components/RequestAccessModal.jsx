import React, { useEffect, useState } from "react";

function RequestAccessModal({ isOpen, software, onClose, onSubmit }) {
  const [form, setForm] = useState({ accessType: "", reason: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setForm({ accessType: "", reason: "" });
  }, [isOpen, software]);

  if (!isOpen || !software) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({
      softwareId: software.id,
      accessType: form.accessType,
      reason: form.reason,
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center tint">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Request Access: <span className="text-green-600">{software.name}</span>
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Type
            </label>
            <select
              name="accessType"
              value={form.accessType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Access Type</option>
              {software.accessLevels?.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              placeholder="Briefly explain your need"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 cursor-pointer text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestAccessModal;
