import React, { ChangeEvent, KeyboardEvent, useState } from "react";
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
import { PCList, PCStatus } from "../../interfaces/pc";
import toastNotify from "../toast/toastNotifications";

const CheckIn = () => {
  const [checkInData, setCheckInData] = useState<Activity>({
    studentNumber: "",
    game: "",
    pcNumber: "",
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [checkInButtonIsDisabled, setCheckInButtonIsDisabled] =
    useState<boolean>(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(0);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
          6,
        ),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        0 < prevIndex ? prevIndex - 1 : prevIndex,
      );
    } else if (e.key === "Enter" && 0 <= selectedSuggestionIndex) {
      e.preventDefault();
      const selectedGame = suggestions[selectedSuggestionIndex];
      handleSuggestionClick(selectedGame);
    }
  };
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
      setSelectedSuggestionIndex(0);
    }
  };

  const validateCheckInData = (checkInData: Activity, pcList: PCList) => {
    if (
      !checkInData.studentNumber ||
      !checkInData.game ||
      !checkInData.pcNumber
    ) {
      return "Please fill out all fields.";
    }
    if (
      Array.from(pcList.pcs.values()).some(
        (pc) => pc.studentNumber === checkInData.studentNumber,
      )
    ) {
      return "This student is already checked in.";
    }
    const pcNumber = Number(checkInData.pcNumber);
    if (isNaN(pcNumber)) {
      return "Please enter a valid PC number.";
    }
    if (!pcList.pcs.has(pcNumber)) {
      return `PC number ${pcNumber} does not exist.`;
    }
    const pc = pcList.pcs.get(pcNumber);
    if (pc.pcStatus === PCStatus.Exec) {
      return "This PC is occupied by an executive.";
    }
    if (pc.pcStatus === PCStatus.Closed) {
      return "This PC is closed.";
    }
    if (pc.studentNumber) {
      return "This PC is already occupied.";
    }
    if (pcNumber === 20) {
      return "This is the check-in PC.";
    }
    return null;
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
    const errorMessage = validateCheckInData(checkInData, pcList);
    if (errorMessage) {
      toastNotify.error(errorMessage);
      return;
    }
    try {
      setCheckInButtonIsDisabled(true);
      await checkInGamer(checkInData);
    } catch (error) {
      if (error.message === "Check in cancelled.") {
        toastNotify.info(error.message);
      } else {
        toastNotify.error(error.message);
      }
      return;
    } finally {
      setCheckInButtonIsDisabled(false);
    }
    const addedProfile = await getGamerProfile(checkInData.studentNumber);
    store.setGamerProfile({
      ...addedProfile,
      studentNumber: addedProfile.student_number,
      firstName: addedProfile.first_name,
      lastName: addedProfile.last_name,
      membershipTier: addedProfile.membership_tier,
      notes: addedProfile.notes,
    });
    setCheckInData({
      studentNumber: "",
      game: "",
      pcNumber: "",
    });
    await fetchPCStatus();
    fetchActivities(1, "");
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
            onKeyDown={handleKeyPress}
            className="rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
          />
          <div className="relative">
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white">
                {suggestions.slice(0, 7).map((suggestion, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    onMouseLeave={() => setSelectedSuggestionIndex(-1)}
                    className={`cursor-pointer p-2 rounded-md ${
                      index === selectedSuggestionIndex
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
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
          className={`max-w-[100px] rounded bg-[#3A6AAC] px-4 py-2 text-[#DEE7EC] ${checkInButtonIsDisabled ? "cursor-not-allowed opacity-50" : "hover:brightness-75"}`}
          disabled={checkInButtonIsDisabled}
        />
      </form>
    </div>
  );
};

export default CheckIn;
