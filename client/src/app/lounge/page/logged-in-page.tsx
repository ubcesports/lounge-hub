"use client";
import "../../globals.css";

import React from "react";
import CheckIn from "../../check-in/check-in";
import Map from "../map";
import StudentInfo from "../../student-info/student-info";
import PCInfo from "../pc-info";
import AddUser from "../../check-in/add-user";
import PlaceholderImage from "../placeholder";
import Button from "../../components/button";
import { useState } from "react";
import { PC, PCStatus } from "../../../interfaces/pc";
import Activity from "../activity";

export default function LoggedInPage() {
  const [isAddingNewGamer, setIsAddingNewGamer] = React.useState(true);
  const [selectedPC, setSelectedPC] = useState<PC | null>(null);
  const [isOccupied, setIsOccupied] = useState<boolean>(false);
  const [pcStatus, setPCStatus] = useState<PCStatus>(PCStatus.Open);
  const handleToggleForm = () => {
    setIsAddingNewGamer(!isAddingNewGamer);
  };

  const handlePCClick = (pc: PC, isOccupied: boolean, pcStatus: PCStatus) => {
    setSelectedPC(pc);
    setIsOccupied(isOccupied);
    setPCStatus(pcStatus);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] p-1">
      <div className="grid h-full grid-cols-9 gap-1">
        {/* left buffer */}
        <div className="col-span-1"></div>
        {/* Live Lounge Map - Left Section */}
        <div className="relative col-span-3 flex flex-col gap-1">
          <div className="col-span-3 h-full rounded-md bg-[#20222C] p-4">
            <h1 className="p-4 text-2xl font-bold text-white">Lounge Map</h1>
            <Map onPCClick={handlePCClick} />
          </div>
          {selectedPC ? (
            <PCInfo pc={selectedPC} isOccupied={isOccupied} pcStatus = {pcStatus} />
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
          <div className="h-full rounded-md bg-[#20222C] p-4">
            <Activity />
          </div>
        </div>
        {/* right */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
