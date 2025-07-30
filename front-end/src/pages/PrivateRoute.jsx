import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get("/videos/all");
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Token verification failed:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
