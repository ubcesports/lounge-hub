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
    if (
      pcList.pcs.find((pc) => String(pc.pcNumber) === checkInData.pcNumber)
        .studentNumber
    ) {
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
    <div className="flex flex-col gap-4 rounded-lg bg-[#20222C] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg text-[#DEE7EC]">Check in</h1>
      </div>
      <form className="grid grid-cols-4 items-end gap-4">
        <TextField
          label="Student number"
          name="studentNumber"
          value={checkInData.studentNumber}
          onChange={handleInputChange}
          className="rounded bg-[#20222C] p-2 text-[#DEE7EC] border border-[#62667B]"
        />
        <TextField
          label="Game"
          name="game"
          value={checkInData.game}
          onChange={handleInputChange}
          className="rounded bg-[#20222C] p-2 text-[#DEE7EC] border border-[#62667B]"
        />
        <TextField
          label="Table #"
          name="pcNumber"
          value={checkInData.pcNumber}
          onChange={handleInputChange}
          className="rounded bg-[#20222C] p-2 text-[#DEE7EC] border border-[#62667B]"
        />
        <Button
          onClick={handleSubmit}
          label="Sign in"
          className="max-w-[90px] rounded bg-[#3A6AAC] px-4 py-2 text-[#DEE7EC] hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

export default CheckIn;
