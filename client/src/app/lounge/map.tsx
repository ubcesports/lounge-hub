import React, { useEffect } from "react";
import useBoundStore from "../../store/store";
import { useFetchPCStatus } from "../../services/activity";
import PCStation from "./pc";

const LoungeMap = () => {
  useFetchPCStatus();

  const pcList = useBoundStore((state) => state.PCList);

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {pcList.pcs.map((pc) => {
        const isOccupied = pc.startedAt !== "";
        return <PCStation pc={pc} key={pc.pcNumber} isOccupied={isOccupied} />;
      })}
    </div>
  );
};

export default LoungeMap;
