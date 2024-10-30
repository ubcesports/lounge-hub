import React, { useEffect } from "react";
import useStore from "../../store/store";
import { fetchPcStatus } from "../../api/fetchPcStatus";

const LoungeMap = () => {
  const { PCList } = useStore((state) => state);

  useEffect(() => {
    fetchPcStatus();
    const interval = setInterval(fetchPcStatus, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const totalPCs = 23; // Total number of PCs
  const pcNumbers = Array.from({ length: totalPCs }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {pcNumbers.map((pcNumber) => {
        const pc = PCList.pcs.find((p) => p.pcNumber === pcNumber);
        return (
          <div
            key={pcNumber}
            className={`flex items-center justify-center h-20 w-20 ${
              pc ? "bg-blue-500" : "bg-gray-300"
            } text-white rounded-lg`}
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