"use client";
import "./globals.css";

import React from "react";
import CheckIn from "./check-in/check-in";
import Login from "./auth/login";
import Map from "./lounge/map";
import StudentInfo from "./student-info/student-info";
import Records from "./records/records";
import Activity from "./lounge/activity";
import PCInfo from "./lounge/pc-info";
import AddUser from "./check-in/add-user";
import Button from "./components/button";

export default function Page() {
  const [isAddingNewGamer, setIsAddingNewGamer] = React.useState(true);

  const handleToggleForm = () => {
    setIsAddingNewGamer(!isAddingNewGamer);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="grid grid-cols-5 gap-4 h-full">
        {/* Live Lounge Map - Left Section */}
        <div className="col-span-2 bg-gray-800 rounded-lg p-4 min-h-full">
          <Map />
        </div>

        {/* Right Column - Check In, Student Info, and Records */}
        <div className="col-span-3 flex flex-col gap-4 relative">
          <div className="absolute top-0 right-0 m-4">
          <Button
              onClick={handleToggleForm}
              label={isAddingNewGamer ? "Add New" : "Check In"}
              className="flex items-center text-green-400 hover:text-green-300"
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-4 flex-grow max-h-[300px]">
            {isAddingNewGamer ? <CheckIn /> : <AddUser />}
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <StudentInfo />
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <Records />
          </div>
        </div>
      </div>
    </div>
  );
}
