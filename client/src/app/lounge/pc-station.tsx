import React, { useEffect, useState } from "react";
import { PC, PCStatus } from "../../interfaces/pc";

interface PCStationProps {
  pc: PC;
  isOccupied: boolean;
  pcStatus: PCStatus;
  onClick: (
    pc: PC,
    timeRemaining: string,
    isOccupied: boolean,
    pcStatus: PCStatus,
  ) => void;
}

const PCStation: React.FC<PCStationProps> = ({
  pc,
  isOccupied,
  pcStatus,
  onClick,
}) => {
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

  // This following block defines "special" renderings for certain PCs. Double height PCs
  // are PCs 9 and 14, the cab is PC 21, and the admin (exec) PC is PC 20.
  // ========================================
  const isDoubleHeight = pc.pcNumber === 9 || pc.pcNumber === 14;
  const isCab = pc.pcNumber === 21;
  const isAdmin = pc.pcNumber === 20;
  // ========================================

  if (isAdmin) {
    // The admin PC should be rendered as a transparent div with a white border (not a button)
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
      onClick={() => onClick(pc, timeRemaining, isOccupied, pcStatus)}
      className={`flex items-center justify-center rounded-md p-4 text-xs ${
        isTimeUp
          ? "border border-white text-white"
          : PCStatus.getMessage(
              pcStatus,
              "bg-[#64CC9F] text-white",
              "bg-[#3A6AAC] text-white",
              "bg-[#DD4345] text-white",
              "bg-[#EAB308] text-white", 
            )
      }`}
      style={{
        height: isDoubleHeight ? "148px" : "70px", // Double height PCs
        width: "70px",
        backgroundColor: isTimeUp ? "transparent" : "",
      }}
    >
      <div className="text-center">
        <p className="text-2xl">
          {isCab ? "Cab" : pc.pcNumber.toString().padStart(2, "0")}
        </p>
        {pcStatus === PCStatus.Busy && (
          <p className="text-xs">{timeRemaining}</p>
        )}
      </div>
    </button>
  );
};

export default PCStation;
