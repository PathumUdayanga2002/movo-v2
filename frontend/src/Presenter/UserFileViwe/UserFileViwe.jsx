import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SIdebar/Sidebar";

const UserFileView = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "video", or "document"

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/files");
        const data = await response.json();
        setFiles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles =
    filter === "all" ? files : files.filter((file) => file.type === filter);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="bg-[#FFF4F0] p-6">
          <h1 className="text-lg font-bold text-gray-700">Hi, Pathum Udayanga</h1>
          <p className="text-2xl font-medium">
            Will you Guide For{" "}
            <span className="text-orange-500 font-bold">Correct Presentation</span>
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex mb-8 justify-center gap-4">
          <button
            onClick={() => setFilter("video")}
            className={`${
              filter === "video" ? "bg-orange-600" : "bg-orange-500"
            } text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200`}
          >
            Videos
          </button>
          <button
            onClick={() => setFilter("document")}
            className={`${
              filter === "document" ? "bg-orange-600" : "bg-orange-500"
            } text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200`}
          >
            Docs
          </button>
        </div>

        {/* File Display Section */}
        <div className="flex-grow p-6 bg-gray-100">
          {loading ? (
            <p className="text-center text-gray-500 text-xl">Loading files...</p>
          ) : filteredFiles.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">
              No files available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <div
                  key={file._id}
                  className="w-[260px] h-[280px] bg-gradient-to-b from-[#fdf2f2] to-[#f6eded] rounded-3xl shadow-lg p-6"
                >
                  <div className="flex justify-center items-center mb-4">
                    {/* Display the file type icon */}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-700 truncate mb-2">
                    {file.name}
                  </h3>
                  <p
                    className="text-sm text-gray-500 truncate"
                    title={file.description || "No description provided"}
                  >
                    {file.description || "No description provided"}
                  </p>

                  {file.type === "document" ? (
                    <a
                      href={`http://localhost:5000${file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-center w-full"
                    >
                      <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200">
                        View Document
                      </button>
                    </a>
                  ) : (
                    <div className="mt-4">
                      <video
                        width="100%"
                        controls
                        className="rounded-md shadow-md"
                      >
                        <source
                          src={`http://localhost:5000${file.url}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFileView;
