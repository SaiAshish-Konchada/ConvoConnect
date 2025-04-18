// src/components/Settings/MoodSelector.jsx

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
  
  export default MoodSelector;
  