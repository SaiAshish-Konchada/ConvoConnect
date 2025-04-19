import React, { useState, useRef, useEffect } from "react";
import { Image, Send } from "lucide-react";
import toast from "react-hot-toast";
import ImagePreviewList from "./ImagePreviewList";
import FullScreenImageModal from "./FullScreenImageModal";
import { useAuthStore } from "../../store/useAuthStore"; // adjust the path as needed
import PropTypes from "prop-types";

const ChatMessages = ({ onSendMessage, selectedUser, onlineUsers }) => {
  const authUser = useAuthStore((state) => state.authUser);
  const [text, setText] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mockMessages, setMockMessages] = useState([]);
  const fileInputRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);
    const invalidFiles = imageFiles.filter(
      (file) => !file.type.startsWith("image/"),
    );
    if (invalidFiles.length > 0) {
      toast.error("Please select only image files");
      return;
    }
    const newImagePreviews = imageFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImagePreviews(newPreviews);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error("You must be logged in to send a message!");
      return;
    }

    if (!text.trim() && imagePreviews.length === 0) {
      toast.error("Type a message or select an image to send.");
      return;
    }

    const newMessage = {
      _id: Date.now().toString(),
      senderId: authUser._id,
      text: text.trim(),
      images: imagePreviews,
      createdAt: new Date().toISOString(),
    };

    setMockMessages((prev) => [...prev, newMessage]);

    if (onSendMessage) onSendMessage(newMessage);

    setText("");
    setImagePreviews([]);
  };

  const handleTextKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event);
    }
  };

  const openFullScreen = (imageSrc, index) => {
    setFullscreenImage(imageSrc);
    setCurrentImageIndex(index);
  };

  const closeFullScreen = () => {
    setFullscreenImage(null);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    const handleFullScreenKeyDown = (event) => {
      if (!fullscreenImage) return;
      if (event.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev + 1 < imagePreviews.length ? prev + 1 : 0,
        );
      } else if (event.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : imagePreviews.length - 1,
        );
      } else if (event.key === "Escape") {
        closeFullScreen();
      }
    };

    window.addEventListener("keydown", handleFullScreenKeyDown);
    return () => window.removeEventListener("keydown", handleFullScreenKeyDown);
  }, [fullscreenImage, imagePreviews]);

  useEffect(() => {
    if (fullscreenImage && imagePreviews.length > 0) {
      setFullscreenImage(imagePreviews[currentImageIndex]);
    }
  }, [currentImageIndex, imagePreviews, fullscreenImage]);

  return (
    <div className="p-4 w-full">
      <FullScreenImageModal
        fullscreenImage={fullscreenImage}
        closeFullScreen={closeFullScreen}
        imagePreviews={imagePreviews}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      {imagePreviews.length > 0 && (
        <ImagePreviewList
          imagePreviews={imagePreviews}
          openFullScreen={openFullScreen}
          removeImage={removeImage}
        />
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <textarea
            rows={1}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleTextKeyDown}
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
            aria-label="Upload Image"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && imagePreviews.length === 0}
          aria-label="Send Message"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

ChatMessages.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  selectedUser: PropTypes.object.isRequired,
  onlineUsers: PropTypes.array.isRequired,
};

export default ChatMessages;
