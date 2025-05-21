import { IoClose } from "react-icons/io5";

export default function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          <IoClose />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6 text-center">{message || "Are you sure you want to delete this item?"}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2  cursor-pointer rounded-md font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
