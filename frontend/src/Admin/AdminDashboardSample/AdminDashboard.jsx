import React from "react";

import CardAndCalendar from "../../components/CardAndCalenderRight/CardAndCalendar";
import DashboardCards from "../../components/DashboardCards/DashboardCards";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/SIdebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className=" flex flex-row bg-orange-100 ">
      <Sidebar />
      <div className="flex flex-col ml-4">
        <div className="w-[900px]">
          <Header />
        </div>

        <div className="flex flex-row justify-between">
          <div className=" w-[700px]">
            <DashboardCards />
            <PresentationList />
          </div>
          <div className=" mt-[16px] w-[300px]">
            <CardAndCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
