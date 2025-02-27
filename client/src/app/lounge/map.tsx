import React from "react";
import useBoundStore from "../../store/store";
import { useFetchPCStatus } from "../../services/activity";
import PCStation from "./pc-station";
import { PC } from "../../interfaces/pc";
import { pcPositions } from "./lounge-layout/lounge-layout";

interface LoungeMapProps {
  onPCClick: (pc: PC, isOccupied: boolean, pcStatus) => void;
}

const LoungeMap: React.FC<LoungeMapProps> = ({ onPCClick }) => {
  useFetchPCStatus();

  const pcList = useBoundStore((state) => state.PCList);

  return (
    <div
      className="grid max-h-[700px] max-w-[370px] grid-cols-5 grid-rows-8 gap-4"
      style={{ margin: "auto" }}
    >
      {pcList.pcs.map((pc, index) => {
        const [x, y] = pcPositions[index];
        return (
          <div
            key={pc.pcNumber}
            className="col-span-1 row-span-1 aspect-square"
            style={{
              gridColumn: x,
              gridRow: y,
            }}
          >
            <PCStation
              pc={pc}
              pcStatus={pc?.pcStatus}
              onClick={() => onPCClick(pc, !!pc?.studentNumber, pc?.pcStatus)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LoungeMap;
