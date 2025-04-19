import React from "react";
import PropTypes from "prop-types";
const VibeDisplay = ({ emoji, message }) => (
  <div className="text-center mb-6">
    <div className="text-3xl font-bold flex justify-center items-center gap-2 animate-bounce">
      {emoji}
      {message}
    </div>
  </div>
);

VibeDisplay.propTypes = {
  emoji: PropTypes.string.isRequired, // emoji should be a string (e.g., "😊")
  message: PropTypes.string.isRequired, // message should be a string (e.g., "Feeling good today!")
};

export default VibeDisplay;
