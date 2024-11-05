import React, { useState, ChangeEvent } from "react";

import Button from "../components/button";
import TextField from "../components/text-field";
import { Activity } from "../../interfaces/activity";
import { checkInGamer, fetchPCStatus } from "../../services/activity";
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
    if (pcList.pcs.find((pc) => String(pc.pcNumber) === checkInData.pcNumber).studentNumber) {
      alert("This PC is already occupied.");
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
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-lg">Check in</h1>
      </div>
      <form className="grid grid-cols-4 gap-4 items-end">
        <TextField
          label="Student number"
          name="studentNumber"
          value={checkInData.studentNumber}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <TextField
          label="Game"
          name="game"
          value={checkInData.game}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <TextField
          label="Table #"
          name="pcNumber"
          value={checkInData.pcNumber}
          onChange={handleInputChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <Button
          onClick={handleSubmit}
          label="Sign in"
          className="bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-500 max-w-[90px]"
        />
      </form>
    </div>
  );
};

export default CheckIn;
