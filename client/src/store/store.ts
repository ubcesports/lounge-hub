import { create } from "zustand";
import { createGamerProfileSlice, GamerProfileSlice } from "./gamer-store";
import { createPCSlice, PCSlice } from "./pc-store";
import { createRecentActivitySlice, LogsSlice } from "./log-store";

const useStore = create<GamerProfileSlice & PCSlice & LogsSlice>()((...a) => ({
  ...createGamerProfileSlice(...a),
  ...createPCSlice(...a),
  ...createRecentActivitySlice(...a),
}));

export default useStore;
