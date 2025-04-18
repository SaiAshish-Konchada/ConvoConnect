// store/useThemeStore.js
import { create } from "zustand";

/**
 * Zustand store for managing the current theme.
 * Themes are synced with localStorage and applied via data-theme on <html>.
 */

export const useThemeStore = create((set) => ({
  /**
   * Current selected theme.
   * Default: "synthwave"
   */
  theme: "synthwave",

  /**
   * Set a new theme.
   * Updates localStorage and the `data-theme` attribute on <html>.
   */
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },

  /**
   * Initialize the theme on first load.
   * Retrieves theme from localStorage or defaults to "synthwave".
   * Applies the theme to the <html> tag and Zustand state.
   */
  initializeTheme: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chat-theme") || "synthwave";
      document.documentElement.setAttribute("data-theme", saved);
      set({ theme: saved });
    }
  },
}));
