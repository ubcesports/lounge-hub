import React from "react";
import { useFetchActivities } from "../../services/activity";
import useBoundStore from "../../store/store";
import { Log } from "../../interfaces/log";
import PlaceholderImage from "../lounge/placeholder";

export default function Activity() {
  useFetchActivities();
  const logList = useBoundStore((state) => state.logList);

  function formatLogData(log: Log) {
    const startedDate = new Date(log.startedAt);
    const endedDate = log.endedAt ? new Date(log.endedAt) : null;

    const dateFormatted =
      `${String(startedDate.getMonth() + 1).padStart(2, "0")}-` +
      `${String(startedDate.getDate()).padStart(2, "0")}-` +
      `${startedDate.getFullYear()}`;
    const startTimeFormatted = startedDate.toTimeString().slice(0, 5);
    const endTimeFormatted = endedDate?.toTimeString().slice(0, 5);

    return `${log.studentNumber} ・ 
            ${dateFormatted} ・ 
            Started ${startTimeFormatted} ・ 
            Ended ${endTimeFormatted || "N/A"} ・ 
            ${log.pcNumber} ・ 
            ${log.game}`;
  }

  if (logList.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white">Activity Log</h1>
        <div className="flex items-center justify-center rounded-md p-4">
          <div className="col-span-3 flex h-full items-center justify-center rounded-md bg-[#20222C] p-4">
            <PlaceholderImage />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Activity Log</h1>
      <div className="h-96 overflow-y-auto p-4">
        {logList.map((log, index) => (
          <div key={index} className="mb-4 border-b border-gray-700 pb-4">
            <h1 className="text-xl text-white">
              {log.firstName} {log.lastName}
            </h1>
            <p className="text-sm text-gray-400">{formatLogData(log)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
