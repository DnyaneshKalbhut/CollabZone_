import { create } from "zustand"; // Change to named import
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

// Wrap the store with persist middleware
appStore = persist(appStore, { name: "my_app_store" });

// Create the store using the create function
export const useAppStore = create(appStore);
