import { StateCreator } from "zustand";
import { PCList } from "../interfaces/pc";

const NUM_PCS = 21;

export interface PCSlice {
  PCList: PCList;
  setPCList: (payload: PCList) => void;
  resetPCState: (pcNumber: number) => void;
  removePCList: () => void;
}

const initialPCListState: PCList = {
  pcs: Array.from({ length: NUM_PCS }, (_, index) => ({
    studentNumber: "",
    pcNumber: index + 1,
    game: "",
    startedAt: "",
    firstName: "",
    lastName: "",
    membershipTier: 0,
    notes: "",
  })),
};

const updatePCList = (pcList: PCList, data: any) => {
  const updatedPCList = pcList.pcs.map((pc) => {
    const updatedPC = data.find((d: any) => d.pc_number === pc.pcNumber);

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
      };
    }
    return pc;
  });

  return { pcs: updatedPCList };
};

export const createPCSlice: StateCreator<PCSlice> = (set) => ({
  PCList: initialPCListState,
  setPCList: (payload: any) =>
    set((state) => ({
      PCList: updatePCList(state.PCList, payload),
    })),
  resetPCState: (pcNumber: number) =>
    set((state) => ({
      PCList: resetPCState(pcNumber, state.PCList),
    })),
  removePCList: () => set({ PCList: initialPCListState }),
});
