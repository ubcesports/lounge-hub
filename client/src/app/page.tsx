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
import PlaceholderImage from "./lounge/placeholder";
import Button from "./components/button";
import { useState } from "react";
import { PC } from "../interfaces/pc";

export default function Page() {
  const [isAddingNewGamer, setIsAddingNewGamer] = React.useState(true);
  const [selectedPC, setSelectedPC] = useState<PC | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isOccupied, setIsOccupied] = useState<boolean>(false);

  const handleToggleForm = () => {
    setIsAddingNewGamer(!isAddingNewGamer);
  };

  const handlePCClick = (
    pc: PC,
    timeRemaining: string,
    isOccupied: boolean,
  ) => {
    setSelectedPC(pc);
    setTimeRemaining(timeRemaining);
    setIsOccupied(isOccupied);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] p-1">
      <div className="grid h-full grid-cols-9 gap-1">
        {/* left buffer */}
      <div className="col-span-1"></div>
        {/* Live Lounge Map - Left Section */}
        <div className="relative col-span-3 flex flex-col gap-1">
          <div className="col-span-3 h-full rounded-md bg-[#20222C] p-4">
            <h1 className="text-white text-2xl font-bold p-4">Lounge Map</h1>
            <Map onPCClick={handlePCClick} />
          </div>
          {selectedPC ? (
            <PCInfo
              pc={selectedPC}
              timeRemaining={timeRemaining}
              isOccupied={isOccupied}
            />
          ) : (
            <div className="col-span-3 h-full rounded-md bg-[#20222C] p-4">
              <PlaceholderImage />
            </div>
          )}
        </div>
        {/* Right Column - Check In, Student Info, and Records */}
        <div className="relative col-span-4 flex flex-col gap-1">
          <div className="absolute right-0 top-0 m-4">
            <Button
              onClick={handleToggleForm}
              label={isAddingNewGamer ? "Add New" : "Check In"}
              className="flex items-center text-green-400 hover:text-green-300"
            />
          </div>
          <div className="max-h-[300px] flex-grow rounded-md bg-[#20222C] p-4">
            {isAddingNewGamer ? <CheckIn /> : <AddUser />}
          </div>
          <div className="rounded-md bg-[#20222C] p-4">
            <StudentInfo />
          </div>
          <div className="rounded-md bg-[#20222C] p-4">
            <Records />
          </div>
        </div>
        {/* right */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
