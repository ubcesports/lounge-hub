import { PC } from "../../interfaces/pc";
import { checkOutGamer } from "../../services/activity";
import TextField from "../components/text-field";
import { useState } from "react";

interface PCInfoProps {
  pc: PC;
  timeRemaining: string;
  isOccupied: boolean;
}

const PCInfo: React.FC<PCInfoProps> = ({ pc, timeRemaining, isOccupied }) => {
  const [execName, setExecName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExecName(e.target.value);
  };

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
      </div>
      <div className="flex items-end gap-4 rounded-lg bg-[#20222C] p-4">
        <TextField
          label="Exec Name"
          name="execName"
          value={execName}
          onChange={handleInputChange}
          className="rounded border border-[#62667B] bg-[#20222C] p-2 text-[#DEE7EC]"
        />
        <div className="group relative">
          <button
            className="h-full rounded border border-red-500 p-2 text-white hover:bg-red-500 hover:text-white"
            onClick={handleClick}
          >
            Close
          </button>
          <div className="absolute bottom-full left-1/2 mb-2 mt-2 hidden w-32 -translate-x-1/2 transform rounded bg-gray-100 p-2 text-center text-xs text-black group-hover:block">
            This sign out will be associated with the provided exec name.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCInfo;
