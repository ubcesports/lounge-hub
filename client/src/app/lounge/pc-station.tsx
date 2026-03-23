import React, { useEffect, useState } from "react";
import { PC, PCStatus } from "../../interfaces/pc";

interface PCStationProps {
  pc: PC;
  pcStatus: PCStatus;
  onClick: (pc: PC, timeRemaining: string, pcStatus: PCStatus) => void;
}

const PCStation: React.FC<PCStationProps> = ({ pc, pcStatus, onClick }) => {
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

  // This block defines special renderings for certain desks.
  // Double height PC is PC 14, cab desks are 21 and 22, and the admin (exec) desk is 20.
  // ========================================
  const isDoubleHeight = pc.pcNumber === 14;
  const isAdmin = pc.pcNumber === 20;
  const stationLabel =
    pc.pcNumber === 21
      ? "C1"
      : pc.pcNumber === 22
        ? "C2"
        : pc.pcNumber.toString().padStart(2, "0");
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
        <p className="text-2xl">{stationLabel}</p>
        {pcStatus === PCStatus.Busy && (
          <p className="text-xs">{timeRemaining}</p>
        )}
      </div>
    </button>
  );
};

export default PCStation;
