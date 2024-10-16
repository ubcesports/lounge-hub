import React, { useState, ChangeEvent } from "react";

import Button from "../components/button";
import TextField from "../components/text-field";
import { Activity } from "../../interfaces/activity";
import { checkInGamer } from "../../services/activity";

const CheckIn = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkInGamer(checkInData);
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
