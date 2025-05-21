import { IoClose } from "react-icons/io5";

export default function ReasonModal({ isOpen, reason, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          <IoClose />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Reason</h3>
        <p className="text-gray-700">{reason}</p>
      </div>
    </div>
  );
}
