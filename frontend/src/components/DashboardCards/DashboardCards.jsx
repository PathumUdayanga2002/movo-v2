import React from "react";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mt-[200px] ml-4 ">
      <div className="p-4 bg-white shadow rounded">My Presentation</div>
      <div className="p-4 bg-white shadow rounded">Upload Details</div>
      <div className="p-4 bg-white shadow rounded">Today Presentations</div>
      <div className="p-4 bg-white shadow rounded">Schedule</div>
    </div>
  );
};

export default DashboardCards;
