import React from "react";
import { Send, Image } from "lucide-react";
import PropTypes from "prop-types";
const MessageInput = ({
  handleSendMessage,
  text,
  setText,
  handleImageChange,
  imagePreviews,
  fileInputRef,
}) => {
  return (
    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <div className="flex-1 flex gap-2">
        <textarea
          rows={1}
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          multiple
          onChange={handleImageChange}
        />
        <button
          type="button"
          className={`hidden sm:flex btn btn-circle ${
            imagePreviews.length > 0 ? "text-emerald-500" : "text-zinc-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
      </div>
      <button
        type="submit"
        className="btn btn-sm btn-circle"
        disabled={!text.trim() && imagePreviews.length === 0}
      >
        <Send size={22} />
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  imagePreviews: PropTypes.array.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};
export default MessageInput;
