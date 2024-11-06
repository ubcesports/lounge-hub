import React, { useState, ChangeEvent } from "react";

import Button from "../components/button";
import TextField from "../components/text-field";
import { Activity } from "../../interfaces/activity";
import {
  checkInGamer,
  fetchActivities,
  fetchPCStatus,
} from "../../services/activity";
import { getGamerProfile } from "../../services/gamer-profile";
import useBoundStore from "../../store/store";

const CheckIn = () => {
  const store = useBoundStore();
  const [checkInData, setCheckInData] = useState<Activity>({
    studentNumber: "",
    game: "",
    pcNumber: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckInData({
      ...checkInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const store = useBoundStore.getState();
    const pcList = store.PCList;
    if (
      pcList.pcs.some((pc) => pc.studentNumber === checkInData.studentNumber)
    ) {
      alert("This student is already checked in.");
      return;
    }
    checkInGamer(checkInData);
    const addedProfile = await getGamerProfile(checkInData.studentNumber);
    store.setGamerProfile({
      ...addedProfile,
      studentNumber: addedProfile.student_number,
      firstName: addedProfile.first_name,
      lastName: addedProfile.last_name,
      membershipTier: addedProfile.membership_tier,
      notes: addedProfile.notes,
    });
    fetchPCStatus();
    fetchActivities();
  };

  return (
    <div>
      <h1>Check In</h1>
      <form>
        <TextField
          label="Student Number"
          name="studentNumber"
          value={checkInData.studentNumber}
          onChange={handleInputChange}
        />
        <TextField
          label="Game"
          name="game"
          value={checkInData.game}
          onChange={handleInputChange}
        />
        <TextField
          label="PC #"
          name="pcNumber"
          value={checkInData.pcNumber}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} label="Check in" />
      </form>
    </div>
  );
};

export default CheckIn;
