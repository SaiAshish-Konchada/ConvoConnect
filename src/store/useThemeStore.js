// store/useThemeStore.js
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "synthwave", // default
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
  initializeTheme: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chat-theme") || "synthwave";
      document.documentElement.setAttribute("data-theme", saved);
      set({ theme: saved });
    }
  },
}));
