import React from 'react';
import personPlaceholder from '../assets/person2.png';

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

export default TypingIndicator;