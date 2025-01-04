import React, { useState } from "react";
import Sidebar from "../../components/SIdebar/Sidebar";
import img1 from "../../assets/images/ion_documents.svg";

const VideoGuide = () => {
  const [activeTab, setActiveTab] = useState("videos");

  const documents = Array(9).fill({
    title: "Document Title 01",
    description: "Horem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const videos = Array(9).fill({
    title: "Video Title 01",
    description: "Horem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#FFF4F0] p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50" // Replace with the actual profile picture URL
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-black">Hi, Pathum Udayanga</h1>
              <p className="text-2xl text-black">
                will you Guide For{" "}
                <span className="text-orange-500 font-semibold text-2xl">
                  Correct Presentation
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="mt-6">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => handleTabChange("videos")}
              className={`px-4 py-2 rounded shadow ${
                activeTab === "videos"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500 border border-orange-500"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => handleTabChange("docs")}
              className={`px-4 py-2 rounded shadow ${
                activeTab === "docs"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500 border border-orange-500"
              }`}
            >
              Docs
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-4">
            {activeTab === "docs" &&
              documents.map((doc, index) => (
                <div
                  key={index}
                  className="w-[260px] h-[270px] bg-[#f6eded] rounded-[23px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  <div className="text-orange-500 text-5xl mb-4">
                    <img
                      src={img1}
                      className="w-20 h-20 relative overflow-hidden items-center"
                    />
                  </div>
                  <h3 className="w-15 h-15 text-center text-black text-lg font-medium">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{doc.description}</p>
                </div>
              ))}

            {activeTab === "videos" &&
              videos.map((video, index) => (
                <div
                  key={index}
                  className="w-[260px] h-[270px] bg-[#f6eded] rounded-[23px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  <div className="text-orange-500 text-5xl mb-4">
                    <img
                      src="https://via.placeholder.com/80" // Replace with video thumbnail
                      className="w-20 h-20 relative overflow-hidden items-center"
                    />
                  </div>
                  <h3 className="w-15 h-15 text-center text-black text-lg font-medium">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGuide;
