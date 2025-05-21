import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Navbar() {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
   
    setToken("");
    setRole("");
    navigate("/"); 
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
   
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-700 tracking-tight">MyCompany</span>
        </div>

    
        <div className="flex items-center gap-6">
          {token && (
            <>
              <span className="text-gray-700 text-sm font-medium">
                Role: <span className="text-green-700 font-semibold">{role || "User"}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
