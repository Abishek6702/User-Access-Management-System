import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  console.log();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // form validation
  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  // user login 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password,
      });

      setToken(data.token);
      localStorage.setItem("role", data.role);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-green-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg px-10 py-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>

    
        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-700 mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-green-400"
            }`}
            placeholder="Enter your username"
            disabled={loading}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

  
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 pr-10 ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              placeholder="Enter your password"
              disabled={loading}
            />
            <span
              className="absolute top-2/4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

       
        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-lg transition duration-200 cursor-pointer ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
         <p className="mt-4 text-gray-700 mb-1 font-medium text-center">Don't have account? <span className="text-green-600 font-bold cursor-pointer" onClick={()=>navigate("/signup")} >SignUp</span></p>
      </form>
     
    </div>
  );
};

export default Login;
