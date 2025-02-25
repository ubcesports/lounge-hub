import React, { useState } from "react";
import { getPCStatusMessage, PCStatus } from "../../interfaces/pc";
import { checkOutGamer } from "../../services/activity";
import TextField from "../components/text-field";
import useBoundStore from "../../store/store";

interface PCInfoProps {
  pcNumber: number;
}

const PCInfo: React.FC<PCInfoProps> = ({ pcNumber}) => {
  const maxLength = 30;
  const [execName, setExecName] = useState<string>("");
  const pc = useBoundStore((state) =>
    state.PCList.pcs.find((p) => p.pcNumber === pcNumber)
  );
  const pcStatus = pc.pcStatus
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExecName(e.target.value);
  };

  const handleSignOutClick = async () => {
    await checkOutGamer(
      pc.studentNumber,
      pc.pcNumber,
      execName,
    );
  };
  const handleExecClick = () => {
    const store = useBoundStore.getState();
    store.setPCStatus(pc.pcNumber, pcStatus === PCStatus.Exec ? PCStatus.Open : PCStatus.Exec);
  };

  const handleClosedClick = () => {
    // alert("Broken Button clicked!");
    const store = useBoundStore.getState();
    store.setPCStatus(pc.pcNumber, pcStatus === PCStatus.Closed ? PCStatus.Open : PCStatus.Closed);
  };

  const truncateName = (
    firstName: string,
    lastName: string,
    studentNumber: string,
    maxLength: number,
  ) => {
    const fullName = `${firstName} ${lastName} ${studentNumber}`;
    if (fullName.length <= maxLength) {
      return fullName;
    }

    const lastNameInitial = lastName.charAt(0);
    const baseText = `${lastNameInitial} ${studentNumber}`;
    const availableLength = maxLength - baseText.length - 1; // 1 for space

    let truncatedFirstName = firstName;
    if (firstName.length > availableLength) {
      truncatedFirstName = firstName.substring(0, availableLength - 3) + "..."; // 3 for ellipsis
    }

    return `${truncatedFirstName} ${lastNameInitial} ${studentNumber}`;
  };

  const formatTime = (time: string, game: string, membershipTier: number) => {
    const date = new Date(time);
    const currentTime = new Date();
    const endTime = new Date(date);

    if (membershipTier === 1) {
      endTime.setHours(date.getHours() + 1);
    } else if (membershipTier === 2) {
      endTime.setHours(date.getHours() + 2);
    }

    const timeDiff = endTime.getTime() - currentTime.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    const formattedHours = hours.toString();
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const timeLeft =
      timeDiff >= 0
        ? `${formattedHours}h ${formattedMinutes}m left`
        : "Time up";

    return `Started ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} \u00B7 ${game} \u00B7 ${timeLeft}`;
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-[#20222C] p-4">
      <div>
        <h1 className="mb-3 text-3xl text-white">Desk {pc.pcNumber}</h1>
        <div className="flex items-center">
          <p
            className={`text-1xl mb-1 ${getPCStatusMessage(pcStatus, "text-green-500", 
              "text-[#3A6AAC]", "text-red-500", "text-[#E2DC6A]")}`}
          >
            {getPCStatusMessage(pcStatus, "OPEN", "EXEC", "BUSY", "CLOSED")}
          </p>
          <p className="text-1xl mb-1 ml-2 max-w-xs truncate text-[#62667B]">
            {pcStatus === PCStatus.Busy
              ? `- ${truncateName(pc.firstName, pc.lastName, pc.studentNumber, maxLength)}`
              : ""}
          </p>
        </div>
        <p className="mb-1 text-xs text-[#62667B]">
          {pcStatus === PCStatus.Busy
            ? `${formatTime(pc.startedAt, pc.game, pc.membershipTier)}`
            : ""}
        </p>
      </div>
      {/*PC Not Busy render broken and exec components*/}
      <div className="flex items-end gap-4 rounded-lg bg-[#20222C] p-4">
        {pcStatus !== PCStatus.Busy && (
          <>
            <div className="group relative">
              <button
                className="h-full rounded border border-[#3A6AAC] p-2 text-white hover:bg-[#3A6AAC] hover:text-white"
                onClick={handleExecClick}
              >
                Executive
              </button>
              <div className="absolute bottom-full left-1/2 mb-2 mt-2 hidden w-32 -translate-x-1/2 transform rounded bg-gray-100 p-2 text-center text-xs text-black group-hover:block">
                This will mark the PC as being used by an executive.
              </div>
            </div>
            <div className="group relative">
              <button
                className="h-full rounded border border-[#E2DC6A] p-2 text-white hover:bg-[#E2DC6A] hover:text-white"
                onClick={handleClosedClick}
              >
                Closed
              </button>
              <div className="absolute bottom-full left-1/2 mb-2 mt-2 hidden w-32 -translate-x-1/2 transform rounded bg-gray-100 p-2 text-center text-xs text-black group-hover:block">
                This will mark the PC as closed.
              </div>
            </div>
          </>
        )}
        {/*PC Busy render sign out components*/}
        {pcStatus === PCStatus.Busy && (
          <>
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
                onClick={handleSignOutClick}
              >
                Close
              </button>
              <div className="absolute bottom-full left-1/2 mb-2 mt-2 hidden w-32 -translate-x-1/2 transform rounded bg-gray-100 p-2 text-center text-xs text-black group-hover:block">
                This sign out will be associated with the provided exec name.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PCInfo;
