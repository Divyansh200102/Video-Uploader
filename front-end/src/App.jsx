import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyVideos from "./pages/MyVideos";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-videos"
          element={
            <PrivateRoute>
              <MyVideos />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
