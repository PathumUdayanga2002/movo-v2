import React from 'react'
import Sidebar from '../../components/SIdebar/Sidebar'

const VideoGuide = () => {
 
  const documents = Array(6).fill({
    title: "Document Title 01",
    description: "Horem ipsum dolor sit amet, consectetur adipiscing elit.",
  });


  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/50" // Replace with the actual profile picture URL
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="text-lg font-bold text-black">Hi, Pathum Udayanga</h1>
          <p className="text-2xl text-black">will you Guide For <p className='text-orange-500 font-semibold text-2xl'>Correct Presentation</p></p>
        </div>
      </div>

      </div>
      <div className="mt-6">
      <div className="flex justify-center gap-4 mb-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded shadow">Videos</button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow">Docs</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <div key={index} className="bg-white shadow p-4 rounded-lg">
            <div className="text-orange-500 text-5xl mb-4">📄</div>
            <h3 className="w-15 h-15 text-center text-black text-lg font-medium">{doc.title}</h3>
            <p className="text-gray-600 text-sm">{doc.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  </div>
  )
}

export default VideoGuide