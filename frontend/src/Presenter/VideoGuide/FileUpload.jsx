import React, { useState } from "react";

const ContentGrid = () => {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    setDocuments((prevDocs) => [...prevDocs, ...files]);
  };

  return (
    <div className="mt-6">
      {/* Upload Section */}
      <div className="flex justify-center gap-4 mb-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded shadow">
          Videos
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow">
          Docs
        </button>
      </div>

      {/* Upload Button */}
      <div className="mb-4 flex justify-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600"
        >
          Upload Documents
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-3 gap-4">
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white shadow p-4 rounded-lg flex flex-col items-center text-center"
            >
              <div className="text-orange-500 text-4xl">📄</div>
              <h3 className="mt-4 font-bold text-gray-700 truncate">
                {doc.name}
              </h3>
              <p className="text-sm text-gray-500">
                {doc.type} - {(doc.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No documents uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentGrid;
