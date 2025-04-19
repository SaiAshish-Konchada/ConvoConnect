import React from "react";
import PropTypes from "prop-types";

const TypingIndicator = ({ avatarSrc }) => (
  <div className="chat chat-start">
    <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img src={avatarSrc} alt="typing avatar" />
      </div>
    </div>
    <div className="chat-bubble flex items-center space-x-2">
      <div className="animate-pulse w-3 h-3 bg-gray-500 rounded-full" />
      <div className="animate-pulse w-3 h-3 bg-gray-500 rounded-full" />
      <div className="animate-pulse w-3 h-3 bg-gray-500 rounded-full" />
    </div>
  </div>
);
TypingIndicator.propTypes = {
  avatarSrc: PropTypes.string.isRequired, // avatarSrc is required and should be a string
};

export default TypingIndicator;
