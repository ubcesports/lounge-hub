import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
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
  pcs: Array.from({ length: NUM_PCS }, (_, index) => ({
    studentNumber: "",
    pcNumber: index + 1,
    game: "",
    startedAt: "",
    firstName: "",
    lastName: "",
    membershipTier: 0,
    notes: "",
    pcStatus: PCStatus.Open,
  })),
});

const updatePCList = (pcList: PCList, data: ActivePC[]) => {
  const updatedPCList = pcList.pcs.map((pc) => {
    const updatedPC = data.find((d: ActivePC) => d.pc_number === pc.pcNumber);

    if (updatedPC) {
      return {
        ...pc,
        studentNumber: updatedPC.student_number,
        game: updatedPC.game,
        startedAt: updatedPC.started_at,
        firstName: updatedPC.first_name,
        lastName: updatedPC.last_name,
        membershipTier: updatedPC.membership_tier,
        notes: updatedPC.notes,
        pcStatus: PCStatus.Busy,
      };
    } else {
      return pc;
    }
  });

  return { pcs: updatedPCList };
};

const resetPCState = (pcNumber: number, pcList: PCList) => {
  const updatedPCList = pcList.pcs.map((pc, index) => {
    if (index === pcNumber - 1) {
      return {
        ...pc,
        studentNumber: "",
        game: "",
        startedAt: "",
        firstName: "",
        lastName: "",
        membershipTier: 0,
        notes: "",
        pcStatus: PCStatus.Open,
      };
    }
    return pc;
  });

  return { pcs: updatedPCList };
};

const setPCStatus = (
  pcNumber: number,
  newPCStatus: PCStatus,
  pcList: PCList,
) => {
  const updatedPCList = pcList.pcs.map((pc, index) => {
    if (index === pcNumber - 1) {
      return {
        ...pc,
        studentNumber: pc.studentNumber,
        game: pc.game,
        startedAt: pc.startedAt,
        firstName: pc.firstName,
        lastName: pc.lastName,
        membershipTier: pc.membershipTier,
        notes: pc.notes,
        pcStatus: newPCStatus,
      };
    }
    return pc;
  });

  return { pcs: updatedPCList };
};

export const createPCSlice: StateCreator<
  PCSlice,
  [],
  [["zustand/persist", PCSlice]]
> = persist(
  (set, get) => ({
    PCList: createInitialPCList(),
    setPCList: (payload: ActivePC[]) =>
      set({ PCList: updatePCList(get().PCList, payload) }),
    resetPCState: (pcNumber: number) =>
      set({ PCList: resetPCState(pcNumber, get().PCList) }),
    setPCStatus: (pcNumber: number, pcStatus: PCStatus) =>
      set({ PCList: setPCStatus(pcNumber, pcStatus, get().PCList) }),
    removePCList: () => set({ PCList: createInitialPCList() }),
  }),
  {
    name: "pc-store", // Key for localStorage
    getStorage: () => localStorage, // Use localStorage for persistence
  },
);
