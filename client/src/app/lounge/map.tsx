import React, { useEffect } from "react";
import useBoundStore from "../../store/store";
import { useFetchPCStatus } from "../../services/activity";

const LoungeMap = () => {
  useFetchPCStatus();

  const pcList = useBoundStore((state) => state.PCList);
  const totalPCs = 23; // Total number of PCs
  const pcNumbers = Array.from({ length: totalPCs }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {pcNumbers.map((pcNumber) => {
        const pc = pcList.pcs.find((p) => p.pcNumber === pcNumber);
        return (
          <div
            key={pcNumber}
            className={`flex h-20 w-20 items-center justify-center ${
              pc ? "bg-blue-500" : "bg-gray-300"
            } rounded-lg text-white`}
          >
            <div>
              <p>PC {pcNumber}</p>
              <p>{pc ? "Busy" : "Available"}</p>
              {pc && (
                <>
                  <p>{pc.studentNumber}</p>
                  <p>{pc.startedAt ? `Started: ${pc.startedAt}` : ""}</p>
                  <p>{pc.membershipTier ? `Tier: ${pc.membershipTier}` : ""}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoungeMap;
