"use client";

import React, { useState } from "react";
import CheckIn from "./check-in/check-in";
import Login from "./auth/login";
import Map from "./lounge/map";
import StudentInfo from "./student-info/student-info";
import Records from "./records/records";
import Activity from "./lounge/activity";
import PcInfo from "./lounge/pc-info";

export default function Page() {
  return (
    <div>
      <div>
        <Login />
      </div>
      <div>
        <Map />
        <Activity />
        <PcInfo />
      </div>
      <div>
        <CheckIn />
        <StudentInfo />
        <Records />
      </div>
    </div>
  );
}
