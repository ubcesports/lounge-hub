import { StateCreator } from "zustand";
import { PCList, PCStatus } from "../interfaces/pc";
import { ActivePC } from "../interfaces/active-pc";

const NUM_PCS = 21;

export interface PCSlice {
  PCList: PCList;
  setPCList: (payload: ActivePC[]) => void;
  resetPCState: (pcNumber: number) => void;
  setPCStatus: (pcNumber: number, pcStatus: PCStatus) => void;
  removePCList: () => void;
}

const createInitialPCList = (): PCList => ({
  pcs: new Map(
    Array.from({ length: NUM_PCS }, (_, index) => [
      index + 1,
      {
        studentNumber: "",
        pcNumber: index + 1,
        game: "",
        startedAt: "",
        firstName: "",
        lastName: "",
        membershipTier: 0,
        notes: "",
        pcStatus: PCStatus.Open,
      },
    ]),
  ),
});

const updatePCList = (pcList: PCList, data: ActivePC[]) => {
  const updatedPCs = new Map(pcList.pcs);
  data.forEach((activePC) => {
    if (updatedPCs.has(activePC.pc_number)) {
      updatedPCs.set(activePC.pc_number, {
        ...updatedPCs.get(activePC.pc_number),
        studentNumber: activePC.student_number,
        game: activePC.game,
        startedAt: activePC.started_at,
        firstName: activePC.first_name,
        lastName: activePC.last_name,
        membershipTier: activePC.membership_tier,
        notes: activePC.notes,
        pcStatus: PCStatus.Busy,
      });
    }
  });
  return { pcs: updatedPCs };
};

const resetPCState = (pcNumber: number, pcList: PCList) => {
  const updatedPCs = new Map(pcList.pcs);
  if (updatedPCs.has(pcNumber)) {
    updatedPCs.set(pcNumber, {
      ...updatedPCs.get(pcNumber),
      studentNumber: "",
      game: "",
      startedAt: "",
      firstName: "",
      lastName: "",
      membershipTier: 0,
      notes: "",
      pcStatus: PCStatus.Open,
    });
  }
  return { pcs: updatedPCs };
};

const setPCStatus = (
  pcNumber: number,
  newPCStatus: PCStatus,
  pcList: PCList,
) => {
  const updatedPCs = new Map(pcList.pcs);
  if (updatedPCs.has(pcNumber)) {
    updatedPCs.set(pcNumber, {
      ...updatedPCs.get(pcNumber),
      pcStatus: newPCStatus,
    });
  }
  return { pcs: updatedPCs };
};

export const createPCSlice: StateCreator<PCSlice> = (set, get) => ({
  PCList: createInitialPCList(),
  setPCList: (payload: ActivePC[]) =>
    set({ PCList: updatePCList(get().PCList, payload) }),
  resetPCState: (pcNumber: number) =>
    set({ PCList: resetPCState(pcNumber, get().PCList) }),
  setPCStatus: (pcNumber: number, pcStatus: PCStatus) =>
    set({ PCList: setPCStatus(pcNumber, pcStatus, get().PCList) }),
  removePCList: () => set({ PCList: createInitialPCList() }),
});
