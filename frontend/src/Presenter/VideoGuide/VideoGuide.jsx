import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SIdebar/Sidebar";

const VideoGuide = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [files, setFiles] = useState([]);

  // Fetch uploaded files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/files");
        const data = await response.json();
        setFiles(data || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const filteredFiles = files.filter((file) => file.type === activeTab);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-[#FFF4F0] p-6">
          <h1 className="text-lg font-bold">Hi, Pathum Udayanga</h1>
          <p className="text-2xl">
            will you Guide For{" "}
            <span className="text-orange-500">Correct Presentation</span>
          </p>
        </div>

        <div className="mt-6">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => handleTabChange("videos")}
              className={`px-4 py-2 rounded ${
                activeTab === "videos" ? "bg-orange-500 text-white" : "bg-white"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => handleTabChange("documents")}
              className={`px-4 py-2 rounded ${
                activeTab === "documents" ? "bg-orange-500 text-white" : "bg-white"
              }`}
            >
              Docs
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file._id}
                className="w-[260px] h-[280px] bg-gradient-to-b from-[#fdf2f2] to-[#f6eded] rounded-3xl shadow-lg p-6"
              >
                <h3 className="text-lg font-medium">{file.name}</h3>
                {file.type === "video" ? (
                  <video width="200" controls>
                    <source src={`http://localhost:5000${file.url}`} />
                  </video>
                ) : (
                  <a
                    href={`http://localhost:5000${file.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGuide;
