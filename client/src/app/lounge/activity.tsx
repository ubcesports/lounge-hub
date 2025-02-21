import React, { useEffect, useState } from "react";
import { fetchActivities } from "../../services/activity";
import useBoundStore from "../../store/store";
import { Log } from "../../interfaces/log";
import Spinner from "../components/spinner";
import { useDebounce } from "../hooks/debounce";

export default function Activity() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const logList = useBoundStore((state) => state.logList);
  const [isLoading, setIsLoading] = useState(false);

  const fetchActivitiesData = async (page: number, search: string) => {
    setIsLoading(true);
    try {
      fetchActivities(page, search);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivitiesData(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

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
            ${log.game} ・ 
            Exec - ${log.execName}`;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="p-4 text-2xl font-bold text-white">Activity Log</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="rounded border border-transparent bg-[#20222C] p-4 text-white focus:border-gray-300"
        />
      </div>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner />
        </div>
      ) : (
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
      )}
      <div className="justify-left mt-4 flex">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1 || isLoading}
          className="mx-2 rounded border border-white bg-transparent p-2 text-white disabled:border-gray-500 disabled:text-gray-500"
        >
          &lt;
        </button>
        <button
          onClick={handleNextPage}
          disabled={logList.length < 10 || isLoading}
          className="mx-2 rounded border border-white bg-transparent p-2 text-white disabled:border-gray-500 disabled:text-gray-500"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
