import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createGamerProfileSlice, GamerProfileSlice } from "./gamer-store";
import { createPCSlice, PCSlice } from "./pc-store";
import { createLogsSlice, LogsSlice } from "./log-store";

const useStore = create<GamerProfileSlice & PCSlice & LogsSlice>()((...a) => ({
  ...createGamerProfileSlice(...a),
  ...persist(createPCSlice, {
    name: "pc-store",
    getStorage: () => localStorage,
  })(...a),
  ...createLogsSlice(...a),
}));

export default useStore;
