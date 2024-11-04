import React from "react";
import { PC } from "../../interfaces/pc";

interface PCStationProps {
  pc: PC;
  isOccupied: boolean;
}

const PCStation: React.FC<PCStationProps> = ({ pc, isOccupied }) => {
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

  const timeRemaining = calculateTimeRemaining(pc.startedAt, pc.membershipTier);
  const isTimeUp = timeRemaining === "Time Up";

  return (
    <div
      className={`flex items-center justify-center rounded p-4 text-xs ${isTimeUp ? "border border-black" : isOccupied ? "border bg-red-500 text-white" : "border bg-green-500 text-white"}`}
      style={{
        height: "100px",
        width: "100px",
        backgroundColor: isTimeUp ? "transparent" : "",
      }}
    >
      <div className="text-center">
        <p className="text-lg">{pc.pcNumber}</p>
        {isOccupied && <p className="text-lg">{timeRemaining}</p>}
      </div>
    </div>
  );
};

export default PCStation;
