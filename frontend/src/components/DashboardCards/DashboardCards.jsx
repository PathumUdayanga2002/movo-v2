import React from "react";

// import images
import myPresentation from "../../assets/images/mypresentation.webp";
import guideVideo from "../../assets/images/guideVideo.png";
import uploadDetails from "../../assets/images/uploadDetails.png";
import aichat from "../../assets/images/aichat.jpg";
const DashboardCards = () => {
  return (
    <div className=" font-poppins grid grid-cols-2 lg:grid-cols-2 gap-4 mt-10 ml-4 ">
      {/* my presentation card */}
      <div className="p-4  bg-white shadow shadow-orange-600 rounded">
        <div className="flex flex-row">
          {/* paragraph and topic */}
          <div className="flex flex-col gap-4">
            <h1 className=" text-xl font-semibold">My Presentation</h1>
            <p className=" text-[14px] text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              soluta, quisquam, quasi, laborum
            </p>
          </div>
          {/* image */}
          <div className="flex">
            <img className=" w-[500px] h-[100px]" src={myPresentation} alt="card image" />
          </div>
        </div>
      </div>
      {/* upload card */}
      <div className="p-4 bg-white shadow shadow-orange-600 rounded">
        <div className="flex flex-row">
          {/* paragraph and topic */}
          <div className="flex flex-col gap-4">
            <h1 className=" text-xl font-semibold">My Presentation</h1>
            <p className=" text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              soluta, quisquam, quasi, laborum
            </p>
          </div>
          {/* image */}
          <div className="flex">
            <img className=" w-[500px] h-[100px]" src={uploadDetails} alt="card image" />
          </div>
        </div>
      </div>
      {/* guidance of presentatoin card */}
      <div className="p-4 bg-white shadow shadow-orange-600 rounded">
        <div className="flex flex-row">
          {/* paragraph and topic */}
          <div className="flex flex-col gap-4">
            <h1 className=" text-xl font-semibold">My Presentation</h1>
            <p className=" text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              soluta, quisquam, quasi, laborum
            </p>
          </div>
          {/* image */}
          <div className="flex">
            <img className=" w-[500px] h-[120px] " src={guideVideo} alt="card image" />
          </div>
        </div>
      </div>
{/* train with ai chat bot */}
<div className="p-4 bg-white shadow shadow-orange-600 rounded">
        <div className="flex flex-row">
          {/* paragraph and topic */}
          <div className="flex flex-col gap-4">
            <h1 className=" text-xl font-semibold">My Presentation</h1>
            <p className=" text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              soluta, quisquam, quasi, laborum
            </p>
          </div>
          {/* image */}
          <div className="flex">
            <img className="  w-[400px] h-[100px]" src={aichat} alt="card image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
