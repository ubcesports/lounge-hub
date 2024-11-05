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
      <div className="grid h-full grid-cols-5 gap-4">
        {/* Live Lounge Map - Left Section */}
        <div className="col-span-2 min-h-full rounded-lg bg-gray-800 p-4">
          <Map />
        </div>

        {/* Right Column - Check In, Student Info, and Records */}
        <div className="relative col-span-3 flex flex-col gap-4">
          <div className="absolute right-0 top-0 m-4">
            <Button
              onClick={handleToggleForm}
              label={isAddingNewGamer ? "Add New" : "Check In"}
              className="flex items-center text-green-400 hover:text-green-300"
            />
          </div>
          <div className="max-h-[300px] flex-grow rounded-lg bg-gray-800 p-4">
            {isAddingNewGamer ? <CheckIn /> : <AddUser />}
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <StudentInfo />
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <Records />
          </div>
        </div>
      </div>
    </div>
  );
}
