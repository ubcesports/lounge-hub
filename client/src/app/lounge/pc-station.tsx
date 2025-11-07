import React, { useEffect, useState } from "react";
import { PC, PCStatus } from "../../interfaces/pc";
import { calculateTimeRemaining } from "../../utils/time-calculation-helpers";

interface PCStationProps {
  pc: PC;
  pcStatus: PCStatus;
  onClick: (pc: PC, timeRemaining: string, pcStatus: PCStatus) => void;
}

const PCStation: React.FC<PCStationProps> = ({ pc, pcStatus, onClick }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const { formatted } = calculateTimeRemaining(
        pc.startedAt,
        pc.membershipTier,
      );
      setTimeRemaining(formatted);
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
      onClick={() => onClick(pc, timeRemaining, pcStatus)}
      className={`flex items-center justify-center rounded-md p-4 text-xs ${
        isTimeUp
          ? "border border-white"
          : pcStatus === PCStatus.Open
            ? "bg-[#64CC9F]"
            : pcStatus === PCStatus.Exec
              ? "bg-[#3A6AAC]"
              : pcStatus === PCStatus.Busy
                ? "bg-[#DD4345]"
                : "bg-[#E2DC6A]"
      } text-white hover:brightness-75`}
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
