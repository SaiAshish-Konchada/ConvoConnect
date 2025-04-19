// src/components/Settings/MoodSelector.jsx
import PropTypes from "prop-types";
const MoodSelector = ({ mood, onChange }) => (
  <div className="flex gap-4 mb-6">
    {["Happy", "Chill", "Inspired", "Excited"].map((newMood) => (
      <button
        key={newMood}
        className={`p-2 rounded-lg ${mood === newMood ? "bg-primary text-primary-content" : "hover:bg-base-200/50"}`}
        onClick={() => onChange(newMood)}
      >
        {newMood}
      </button>
    ))}
  </div>
);

// Define PropTypes for MoodSelector
MoodSelector.propTypes = {
  mood: PropTypes.string.isRequired, // Current selected mood (e.g., "Happy")
  onChange: PropTypes.func.isRequired, // Function to handle mood change
};

export default MoodSelector;
