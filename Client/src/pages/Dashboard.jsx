import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (!role) {
      navigate("/login");
      return;
    }

    // to redirect to respective dashboard based on user role
    if (role === "Admin") {
      navigate("/dashboard/admin");
    } else if (role === "Manager") {
      navigate("/dashboard/manager");
    } else if (role === "Employee") {
      navigate("/dashboard/employee");
    }
  }, [role, navigate]);

  return <div>Loading dashboard...</div>;
};

export default Dashboard;
