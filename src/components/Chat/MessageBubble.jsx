import React from "react";
import { formatMessageTime } from "../../lib/utils";
import PropTypes from "prop-types";

const MessageBubble = ({
  message,
  isOwn,
  avatarSrc,
  senderName,
  onImageClick,
}) => (
  <div className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>
    <div className="chat-image avatar">
      <div className="size-10 rounded-full border">
        <img src={avatarSrc} alt={`${senderName} avatar`} />
      </div>
    </div>

    <div className="chat-header mb-1 font-semibold">{senderName}</div>

    <div className="chat-bubble flex flex-col space-y-2">
      {message.images?.map((img, idx) => (
        <button
          type="button"
          key={img}
          onClick={() => onImageClick(img, idx)}
          className="sm:max-w-[200px] rounded-md p-0 bg-transparent border-none cursor-pointer"
          aria-label={`Open attachment ${idx + 1}`}
        >
          <img
            src={img}
            alt={`attachment-${idx}`}
            className="w-full h-full object-cover rounded-md"
          />
        </button>
      ))}
      {message.text && <p>{message.text}</p>}
    </div>

    <time className="text-xs opacity-50 mt-1">
      {formatMessageTime(message.createdAt)}
    </time>
  </div>
);

MessageBubble.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isOwn: PropTypes.bool,
  avatarSrc: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default MessageBubble;
