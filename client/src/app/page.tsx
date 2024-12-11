"use client";
import "./globals.css";

import React from "react";
import CheckIn from "./check-in/check-in";
import Map from "./lounge/map";
import StudentInfo from "./student-info/student-info";
import PCInfo from "./lounge/pc-info";
import AddUser from "./check-in/add-user";
import PlaceholderImage from "./lounge/placeholder";
import Button from "./components/button";
import { useState } from "react";
import { PC } from "../interfaces/pc";
import Activity from "./lounge/activity";
import AuthStatus from "./components/authStatus";
import { useAuth0 } from "@auth0/auth0-react";

export default function Page() {
  const [isAddingNewGamer, setIsAddingNewGamer] = React.useState(true);
  const [selectedPC, setSelectedPC] = useState<PC | null>(null);
  const [isOccupied, setIsOccupied] = useState<boolean>(false);

  // Auth contexts
  const { isAuthenticated } =
    useAuth0();

  const handleToggleForm = () => {
    setIsAddingNewGamer(!isAddingNewGamer);
  };

  const handlePCClick = (pc: PC, isOccupied: boolean) => {
    setSelectedPC(pc);
    setIsOccupied(isOccupied);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] p-1">
      <AuthStatus />
      {isAuthenticated ? (
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
              <PCInfo pc={selectedPC} isOccupied={isOccupied} />
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
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="text-center text-lg text-white">
            You not logged in boi!
          </p>
        </div>
      )}
    </div>
  );
}
