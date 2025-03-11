import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
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
      version: 1,
      partialize: (state) => ({ PCList: state.PCList }), // Persist only PCList
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const existingValue = JSON.parse(str);
          return {
            ...existingValue,
            state: {
              ...existingValue.state,
              PCList: {
                pcs: new Map(existingValue.state.PCList.pcs),
              },
            },
          };
        },
        setItem: (
          name,
          newValue: StorageValue<GamerProfileSlice & PCSlice & LogsSlice>,
        ) => {
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              PCList: {
                pcs: Array.from(newValue.state.PCList.pcs.entries()),
              },
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export default useStore;
