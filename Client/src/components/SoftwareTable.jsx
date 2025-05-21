import { IoPencil, IoTrash } from "react-icons/io5";

export default function SoftwareTable({ softwares, onEdit, onDelete }) {
  if (!Array.isArray(softwares) || softwares.length === 0)
    return <div className="text-center text-gray-400">No software found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Access Levels</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {softwares.map((sw) => (
            <tr
              key={sw.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 font-medium text-gray-800">{sw.name}</td>
              <td className="py-3 px-4 text-gray-600">{sw.description}</td>
              <td className="py-3 px-4 text-xs text-gray-500">
                {Array.isArray(sw.accessLevels)
                  ? sw.accessLevels.join(", ")
                  : ""}
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onEdit(sw)}
                  className="text-green-600 hover:text-green-800 text-xl mr-2"
                  title="Edit"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="16"
                      fill="green"
                      fill-opacity="0.8"
                    />
                    <path
                      d="M17.7167 13.5167L18.4833 14.2833L10.9333 21.8333H10.1667V21.0667L17.7167 13.5167ZM20.7167 8.5C20.5083 8.5 20.2917 8.58333 20.1333 8.74167L18.6083 10.2667L21.7333 13.3917L23.2583 11.8667C23.3356 11.7896 23.3969 11.698 23.4387 11.5972C23.4805 11.4964 23.502 11.3883 23.502 11.2792C23.502 11.17 23.4805 11.062 23.4387 10.9611C23.3969 10.8603 23.3356 10.7688 23.2583 10.6917L21.3083 8.74167C21.1417 8.575 20.9333 8.5 20.7167 8.5ZM17.7167 11.1583L8.5 20.375V23.5H11.625L20.8417 14.2833L17.7167 11.1583Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(sw.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  title="Delete"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="16"
                      fill="red"
                      fill-opacity="0.8"
                    />
                    <path
                      d="M11.833 23.5C11.3747 23.5 10.9825 23.3369 10.6563 23.0108C10.3302 22.6847 10.1669 22.2922 10.1663 21.8333V11H9.33301V9.33333H13.4997V8.5H18.4997V9.33333H22.6663V11H21.833V21.8333C21.833 22.2917 21.67 22.6842 21.3438 23.0108C21.0177 23.3375 20.6252 23.5006 20.1663 23.5H11.833ZM20.1663 11H11.833V21.8333H20.1663V11ZM13.4997 20.1667H15.1663V12.6667H13.4997V20.1667ZM16.833 20.1667H18.4997V12.6667H16.833V20.1667Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
