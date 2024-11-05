import { PC } from "../../interfaces/pc";
import { checkOutGamer } from "../../services/activity";
import { useState } from "react";

interface PCInfoProps {
  pc: PC;
  timeRemaining: string;
  isOccupied: boolean;
}

const PCInfo: React.FC<PCInfoProps> = ({ pc, timeRemaining, isOccupied }) => {
  const [status, setStatus] = useState(isOccupied ? "BUSY" : "OPEN");

  const handleClick = async () => {
    await checkOutGamer(pc.studentNumber, pc.pcNumber);
    setStatus("OPEN");
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4">
      <div>
        <h1 className="mb-3 text-3xl text-white">Desk {pc.pcNumber}</h1>
        <p
          className={`text-1xl mb-3 ${status === "BUSY" ? "text-red-500" : "text-green-500"}`}
        >
          {status}
        </p>
      </div>
      <button
        className="rounded border border-red-500 p-2 text-white hover:bg-red-500 hover:text-white"
        onClick={handleClick}
      >
        Close
      </button>
    </div>
  );
};

export default PCInfo;
