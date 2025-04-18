import React from 'react';
import { formatMessageTime } from '../../lib/utils';

const MessageBubble = ({ message, isOwn, avatarSrc, senderName, onImageClick }) => (
  <div className={`chat ${isOwn ? 'chat-end' : 'chat-start'}`}>    
    <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img src={avatarSrc} alt={senderName} />
      </div>
    </div>

    <div className="chat-header mb-1 font-semibold">
      {senderName}
    </div>

    <div className="chat-bubble flex flex-col space-y-2">
      {message.images?.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`attachment-${idx}`}
          className="sm:max-w-[200px] rounded-md cursor-pointer"
          onClick={() => onImageClick(img, idx)}
        />
      ))}
      {message.text && <p>{message.text}</p>}
    </div>

    <time className="text-xs opacity-50 mt-1">
      {formatMessageTime(message.createdAt)}
    </time>
  </div>
);

export default MessageBubble;