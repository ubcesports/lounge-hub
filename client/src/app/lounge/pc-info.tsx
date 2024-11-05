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
    <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
      <div>
        <h1 className="text-3xl text-white mb-3">Desk {pc.pcNumber}</h1>
        <p className={`text-1xl mb-3 ${status === "BUSY" ? "text-red-500" : "text-green-500"}`}>
          {status}
        </p>
      </div>
      <button
        className="border border-red-500 text-white rounded p-2 hover:bg-red-500 hover:text-white"
        onClick={handleClick}
      >
        Close
      </button>
    </div>
  );
};

export default PCInfo;
