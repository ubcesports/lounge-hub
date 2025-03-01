import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createGamerProfileSlice, GamerProfileSlice } from "./gamer-store";
import { createPCSlice, PCSlice } from "./pc-store";
import { createLogsSlice, LogsSlice } from "./log-store";

const useStore = create<GamerProfileSlice & PCSlice & LogsSlice>()(
  persist(
    (...a) => ({
      ...createGamerProfileSlice(...a),
      ...createLogsSlice(...a),
      ...createPCSlice(...a),
    }),
    {
      name: "pc-store",
      partialize: (state) => ({ PCList: state.PCList }), // Persist only PCList
    }
  )
);

export default useStore;
