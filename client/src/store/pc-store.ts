import { StateCreator } from "zustand";
import { PCList } from "../interfaces/pc";

const NUM_PCS = 23;

export interface PCSlice {
  PCList: PCList;
  setPCList: (payload: PCList) => void;
  removePCList: () => void;
}

const initialPCState: PCList = {
  pcs: Array.from({ length: NUM_PCS }, (_, index) => ({
    studentNumber: "",
    pcNumber: index + 1,
    game: "",
    startedAt: "",
    firstName: "",
    lastName: "",
    membershipTier: "",
    notes: "",
  })),
};

export const createPCSlice: StateCreator<PCSlice> = (set) => ({
  PCList: initialPCState,
  setPCList: (payload: PCList) => set({ PCList: payload }),
  removePCList: () => set({ PCList: initialPCState }),
});

