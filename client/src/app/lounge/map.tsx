import useBoundStore from "../../store/store";
import { useFetchPCStatus } from "../../services/activity";
import PCStation from "./pc-station";
import { useState } from "react";
import { PC } from "../../interfaces/pc";
import PCInfo from "./pc-info";

interface LoungeMapProps {
  onPCClick: (pc: PC, timeRemaining: string, isOccupied: boolean) => void;
}

const LoungeMap: React.FC<LoungeMapProps> = ({ onPCClick }) => {
  useFetchPCStatus();

  const pcList = useBoundStore((state) => state.PCList);

  // position for each i-th pc is [x, y]
  const positions = [
    [5, 5], // Position for PC 1
    [5, 6], // Position for PC 2
    [5, 7], // Position for PC 3
    [5, 8], // Position for PC 4
    [2, 9], // Position for PC 5
    [1, 9], // Position for PC 6
    [1, 7], // Position for PC 7
    [2, 7], // Position for PC 8
    [3, 6], // Position for PC 9
    [2, 6], // Position for PC 10
    [1, 6], // Position for PC 11
    [1, 4], // Position for PC 12
    [2, 4], // Position for PC 13
    [3, 3], // Position for PC 14
    [2, 3], // Position for PC 15
    [1, 3], // Position for PC 16
    [1, 1], // Position for PC 17
    [2, 1], // Position for PC 18
    [3, 1], // Position for PC 19
  ]

  return (
    <div className="grid grid-cols-5 grid-rows-8 gap-1 p-1 max-h-[700px] max-w-[370px]" style={{ margin : 'auto'}}>
      {pcList.pcs.map((pc, index) => {
        const [x, y] = positions[index];
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
              isOccupied={!!pc?.studentNumber}
              onClick={() => onPCClick(pc, "", !!pc?.studentNumber)}
            />
          </div>
        );
      })}
    </div>
  );
};
export default LoungeMap;
