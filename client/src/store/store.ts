import { create, StateCreator } from "zustand";
import { GamerProfile } from "../interfaces/gamer-profile";

interface GamerProfileSlice {
  GamerProfile: GamerProfile;
  setGamerProfile: (payload: GamerProfile) => void;
  removeGamerProfile: () => void;
}

export const initialGamerState: GamerProfile = {
  studentNumber: "",
  firstName: "",
  lastName: "",
  membershipTier: 0,
  notes: "",
};

const createGamerProfileSlice: StateCreator<GamerProfileSlice> = (set) => ({
  GamerProfile: initialGamerState,
  setGamerProfile: (payload: GamerProfile) => set({ GamerProfile: payload }),
  removeGamerProfile: () => set({ GamerProfile: initialGamerState }),
});

const useStore = create<GamerProfileSlice>()((...a) => ({
  ...createGamerProfileSlice(...a),
}));

export default useStore;
