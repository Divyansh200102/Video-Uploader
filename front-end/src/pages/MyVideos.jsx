import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

function MyVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/videos/all");
        setVideos(res.data.videos);
      } catch (err) {
        alert("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">My Uploaded Videos</h2>

        {videos.length === 0 ? (
          <p className="text-center text-gray-600">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((filename, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <video controls className="w-full rounded-md mb-2">
                  <source
                    src={`http://localhost:7777/upload/${filename}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <p className="text-sm text-gray-700 break-words">{filename}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyVideos;
