import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!videoFile) return alert("Please select a video");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      await axios.post("/videos/upload", formData);
      alert("Upload successful");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="mb-4 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Upload Video
        </button>

        <button
          onClick={() => navigate("/my-videos")}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
        >
          View My Videos
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
