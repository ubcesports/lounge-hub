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

export default function Page() {
  return (
    <div>
      <div>
        <Login />
      </div>
      <div>
        <Map />
        <Activity />
      </div>
      <div>
        <CheckIn />
        <AddUser />
        <StudentInfo />
        <Records />
      </div>
    </div>
  );
}
