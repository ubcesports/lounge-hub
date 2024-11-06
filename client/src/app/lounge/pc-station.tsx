import React, { useEffect, useState } from "react";
import { PC } from "../../interfaces/pc";

interface PCStationProps {
  pc: PC;
  isOccupied: boolean;
  onClick: (pc: PC, timeRemaining: string, isOccupied: boolean) => void;
}

const PCStation: React.FC<PCStationProps> = ({ pc, isOccupied, onClick }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const calculateTimeRemaining = (
    startedAt: string,
    membershipTier: number,
  ): string => {
    const startTime = new Date(startedAt);
    const duration = membershipTier === 1 ? 60 * 60 * 1000 : 2 * 60 * 60 * 1000; // 1 hour for tier 1, 2 hours for tier 2
    const endTime = new Date(startTime.getTime() + duration);
    const now = new Date();

    const timeDiff = endTime.getTime() - now.getTime();
    if (timeDiff <= 0) {
      return "Time Up";
    }

    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));

    if (hours === 0) {
      return `${minutes.toString().padStart(2, "0")}m`;
    }

    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  };

  useEffect(() => {
    const updateRemainingTime = () => {
      setTimeRemaining(calculateTimeRemaining(pc.startedAt, pc.membershipTier));
    };
    updateRemainingTime(); // Initial call
    const intervalId = setInterval(updateRemainingTime, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [pc.startedAt, pc.membershipTier]);

  const isTimeUp = timeRemaining === "Time Up";
  const isDoubleHeight = pc.pcNumber === 9 || pc.pcNumber === 14;
  const isCab = pc.pcNumber === 21;
  const isCheckIn = pc.pcNumber === 20;

  if (isCheckIn) {
    // Check-in PC
    return (
      <div
        className="flex items-center justify-center rounded-md border border-white p-4 text-xs"
        style={{
          height: "70px",
          width: "70px",
          backgroundColor: "transparent",
        }}
      >
        <div className="text-center">
          <p className="text-lg text-white">You</p>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onClick(pc, timeRemaining, isOccupied)}
      className={`flex items-center justify-center rounded-md p-4 text-xs ${isTimeUp ? "border border-black" : isOccupied ? "bg-[#DD4345] text-white" : "bg-[#64CC9F] text-white"}`}
      style={{
        height: isDoubleHeight ? "148px" : "70px",
        width: "70px",
        backgroundColor: isTimeUp ? "transparent" : "",
      }}
    >
      <div className="text-center">
        <p className="text-2xl">{isCab ? "Cab" : pc.pcNumber}</p>
        {isOccupied && <p className="text-xs">{timeRemaining}</p>}
      </div>
    </button>
  );
};

export default PCStation;
