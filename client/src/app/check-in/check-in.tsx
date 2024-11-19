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
import games from "../../../public/games/games.js";

const CheckIn = () => {
  const [checkInData, setCheckInData] = useState<Activity>({
    studentNumber: "",
    game: "",
    pcNumber: "",
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckInData({
      ...checkInData,
      [name]: value,
    });

    if (name === "game") {
      const filteredSuggestions = games.filter((game) =>
        game.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCheckInData({
      ...checkInData,
      game: suggestion,
    });
    setSuggestions([]);
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
    if (checkInData.pcNumber === "20") {
      alert("This is the check in PC.");
      return;
    }
    await checkInGamer(checkInData);
    const addedProfile = await getGamerProfile(checkInData.studentNumber);
    store.setGamerProfile({
      ...addedProfile,
      studentNumber: addedProfile.student_number,
      firstName: addedProfile.first_name,
      lastName: addedProfile.last_name,
      membershipTier: addedProfile.membership_tier,
      notes: addedProfile.notes,
    });
    await fetchPCStatus();
    fetchActivities();
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-[#20222C] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Check in</h1>
      </div>
      <form className="grid grid-cols-4 items-end gap-4">
        <TextField
          label="Student number"
          name="studentNumber"
          value={checkInData.studentNumber}
          onChange={handleInputChange}
          className="rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
        />
        <div>
          <TextField
            label="Game"
            name="game"
            value={checkInData.game}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setSuggestions([]), 100)}
            className="rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
          />
          <div className="relative">
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white">
                {suggestions.slice(0, 7).map((suggestion, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <TextField
          label="Table #"
          name="pcNumber"
          value={checkInData.pcNumber}
          onChange={handleInputChange}
          className="rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
        />
        <Button
          onClick={handleSubmit}
          label="Check in"
          className="max-w-[100px] rounded bg-[#3A6AAC] px-4 py-2 text-[#DEE7EC] hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

export default CheckIn;
