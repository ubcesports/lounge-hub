import React, { useState, ChangeEvent } from "react";

import Button from "../components/button";
import TextField from "../components/text-field";

interface CheckInData {
	studentNumber: string;
	game: string;
	pc: string;
}

const CheckIn = () => {
  const [checkInData, setCheckInData] = useState<CheckInData>({
		studentNumber: "",
		game: "",
		pc: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCheckInData({
			...checkInData,
			[e.target.name]: e.target.value,
		});
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", checkInData);
		alert(`Signed in: ${checkInData.studentNumber}, ${checkInData.game}, PC: ${checkInData.pc}`);
	}

  return (
    <div>
      <h1>Check In</h1>
      <form>
        <TextField
          label="Student Number"
          name="studentNumber"
          value={checkInData.studentNumber}
          onChange={handleChange}
        />
        <TextField
          label="Game"
          name="game"
          value={checkInData.game}
          onChange={handleChange}
        />
        <TextField
          label="PC #"
          name="pc"
          value={checkInData.pc}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} label="Check in" />
      </form>
    </div>
  );
};

export default CheckIn;
