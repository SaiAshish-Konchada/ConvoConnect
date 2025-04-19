import React from "react";
import { themeNames } from "../../constants/themes"; // Adjust the import path accordingly
import PropTypes from "prop-types";
const ThemeSelector = ({ filteredThemes, handleThemeChange, theme }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
      {filteredThemes.map((t) => (
        <button
          key={t}
          className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-300
            ${theme === t ? "bg-base-200 transform scale-105 shadow-xl" : "hover:bg-base-200/50 hover:scale-110 hover:shadow-xl"}`}
          onClick={(e) => handleThemeChange(t, e)}
        >
          <div
            className="relative h-8 w-full rounded-md overflow-hidden"
            data-theme={t}
          >
            <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
              <div className="rounded bg-primary"></div>
              <div className="rounded bg-secondary"></div>
              <div className="rounded bg-accent"></div>
              <div className="rounded bg-neutral"></div>
            </div>
          </div>
          <span className="text-[11px] font-medium truncate w-full text-center">
            {themeNames[t] || t.charAt(0).toUpperCase() + t.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
};
ThemeSelector.propTypes = {
  filteredThemes: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of available themes
  handleThemeChange: PropTypes.func.isRequired, // Function to handle theme change
  theme: PropTypes.string.isRequired, // The current selected theme
};
export default ThemeSelector;
