import { PC } from "../../interfaces/pc";
import { checkOutGamer } from "../../services/activity";

interface PCInfoProps {
  pc: PC;
  timeRemaining: string;
  isOccupied: boolean;
}

const PCInfo: React.FC<PCInfoProps> = ({ pc, timeRemaining, isOccupied }) => {
  const handleClick = async () => {
    await checkOutGamer(pc.studentNumber, pc.pcNumber);
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-[#20222C] p-4">
      <div>
        <h1 className="mb-3 text-3xl text-white">Desk {pc.pcNumber}</h1>
        <p
          className={`text-1xl mb-1 ${isOccupied ? "text-red-500" : "text-green-500"}`}
        >
          {isOccupied ? "BUSY" : "OPEN"}
        </p>
        <p className="text-1xl mb-3 text-white">
          {isOccupied ? `Time remaining: ${timeRemaining}` : ""}
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
