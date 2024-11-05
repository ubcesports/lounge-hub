import useBoundStore from "../../store/store";
import { useFetchPCStatus } from "../../services/activity";
import PCStation from "./pc-station";
import { useState } from "react";
import { PC } from "../../interfaces/pc";
import PCInfo from "./pc-info";

const LoungeMap = () => {
  const [selectedPC, setSelectedPC] = useState<PC | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isOccupied, setIsOccupied] = useState<boolean>(false);

  useFetchPCStatus();

  const pcList = useBoundStore((state) => state.PCList);

  const handlePCClick = (
    pc: PC,
    timeRemaining: string,
    isOccupied: boolean,
  ) => {
    setSelectedPC(pc);
    setTimeRemaining(timeRemaining);
    setIsOccupied(isOccupied);
  };
  return (
    <div>
      <div className="grid grid-cols-5 gap-4 p-4">
        {pcList.pcs.map((pc) => (
          <PCStation
            key={pc.pcNumber}
            pc={pc}
            isOccupied={!!pc?.studentNumber}
            onClick={handlePCClick}
          />
        ))}
      </div>
      {selectedPC && (
        <PCInfo
          pc={selectedPC}
          timeRemaining={timeRemaining}
          isOccupied={isOccupied}
        />
      )}
    </div>
  );
};

export default LoungeMap;
