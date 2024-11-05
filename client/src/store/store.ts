import { create } from "zustand";
import { createGamerProfileSlice, GamerProfileSlice } from "./gamer-store";
import { createPCSlice, PCSlice } from "./pc-store";

const useStore = create<GamerProfileSlice & PCSlice>()((...a) => ({
  ...createGamerProfileSlice(...a),
  ...createPCSlice(...a),
}));

export default useStore;
