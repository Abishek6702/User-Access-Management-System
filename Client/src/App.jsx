import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getUser } from "./services/auth";
import AdminDashboard from "../src/components/AdminDashboard";
import ManagerDashboard from "../src/components/ManagerDashboard";
import EmployeeDashboard from "../src/components/EmployeeDashboard";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const user = getUser();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        
      </Routes>
    </>
  );
};

export default App;
