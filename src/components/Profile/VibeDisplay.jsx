import React from "react";

const VibeDisplay = ({ emoji, message }) => (
  <div className="text-center mb-6">
    <div className="text-3xl font-bold flex justify-center items-center gap-2 animate-bounce">
      {emoji}
      {message}
    </div>
  </div>
);

export default VibeDisplay;