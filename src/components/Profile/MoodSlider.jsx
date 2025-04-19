import React from "react";
import PropTypes from "prop-types";

const MoodSlider = ({ mood, setMood }) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-2">Mood Today 😄</h2>
    <input
      type="range"
      min="1"
      max="5"
      value={mood}
      onChange={(e) => setMood(parseInt(e.target.value))}
      className="range range-primary"
    />
    <div className="flex justify-between text-xs text-zinc-400 mt-1 px-1">
      <span>😴</span>
      <span>😐</span>
      <span>😊</span>
      <span>😄</span>
      <span>🤩</span>
    </div>
  </div>
);

MoodSlider.propTypes = {
  mood: PropTypes.number.isRequired, // mood is a required number between 1 and 10
  setMood: PropTypes.func.isRequired, // setMood is a required function to update the mood
};

export default MoodSlider;
