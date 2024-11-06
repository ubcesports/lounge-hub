import { StateCreator } from "zustand";
import { Log } from "../interfaces/log";

export interface LogsSlice {
  logList: Log[];
  setLogList: (payload: Log[]) => void;
  removeLogList: () => void;
}

const initialLogState: Log[] = [];

const updateLogList = (data: any) => {
  const updatedLogList = data.map((log) => {
    return {
      firstName: log.first_name,
      lastName: log.last_name,
      studentNumber: log.student_number,
      game: log.game,
      pcNumber: log.pc_number,
      startedAt: log.started_at,
      endedAt: log.ended_at,
    };
  });

  return updatedLogList;
};

const replaceLogList = (data: any, set, get) => {
  const newLogList = updateLogList(data);
  const currentLogList = get().logList;

  const hasChanged =
    JSON.stringify(currentLogList) !== JSON.stringify(newLogList);

  if (hasChanged) {
    set({ logList: newLogList });
  }
};

export const createLogsSlice: StateCreator<LogsSlice> = (set, get) => ({
  logList: initialLogState,
  setLogList: (payload: any) => {
    replaceLogList(payload, set, get);
  },
  removeLogList: () => set({ logList: initialLogState }),
});