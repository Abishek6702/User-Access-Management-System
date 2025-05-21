import { useState } from "react";
import { IoClose } from "react-icons/io5";

const ACCESS_LEVEL_OPTIONS = ["Read", "Write", "Admin"];

export default function SoftwareForm({
  open,
  form,
  editId,
  error,
  onChange,
  onSubmit,
  onCancel,
}) {
  const [localError, setLocalError] = useState("");


  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    if (!form.name.trim()) {
      setLocalError("Name is required.");
      return;
    }
    if (!form.description.trim()) {
      setLocalError("Description is required.");
      return;
    }
    if (!form.accessLevels || form.accessLevels.length === 0) {
      setLocalError("Please select at least one access level.");
      return;
    }
    onSubmit(e);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          <IoClose />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {editId ? "Edit Software" : "Create Software"}
        </h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Levels
            </label>
            <div className="flex gap-4">
              {ACCESS_LEVEL_OPTIONS.map((level) => (
                <label key={level} className="flex items-center gap-1 text-md">
                  <input
                    type="checkbox"
                    name="accessLevels"
                    value={level}
                    checked={form.accessLevels.includes(level)}
                    onChange={onChange}
                    className="accent-green-600"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded-md font-semibold hover:bg-green-700 transition-colors"
            >
              {editId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md cursor-pointer font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
          {(localError || error) && (
            <div className="text-red-500">{localError || error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
