import React from "react";
import { PC } from "../../interfaces/pc";

interface PCStationProps {
  pc: PC;
  isOccupied: boolean;
}

const PCStation: React.FC<PCStationProps> = ({ pc, isOccupied }) => {
  const calculateTimeRemaining = (startedAt: string): string => {
    const startTime = new Date(startedAt);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour
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

    return `${hours}h: ${minutes.toString().padStart(2, "0")}m`;
  };

  return (
    <div
      className={`flex items-center justify-center rounded border p-4 text-xs ${isOccupied ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
      style={{ height: "100px", width: "100px" }}
    >
      <div className="text-center">
        <p className="text-2xl">{pc.pcNumber}</p>
        {isOccupied && <p className="text-base">{calculateTimeRemaining(pc.startedAt)}</p>}
      </div>
    </div>
  );
};

export default PCStation;
