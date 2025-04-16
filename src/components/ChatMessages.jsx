import { useState, useRef, useEffect } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
const ChatMessages = ({ onSendMessage, selectedUser, onlineUsers }) => {
  const [text, setText] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle image file change
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);

    // Validate that all files are images
    const invalidFiles = imageFiles.filter(
      (file) => !file.type.startsWith("image/"),
    );
    if (invalidFiles.length > 0) {
      toast.error("Please select only image files");
      return;
    }

    // Convert files to preview URLs
    const newImagePreviews = imageFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  };

  // Remove an image from the preview
  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImagePreviews(newPreviews);
  };

  // Handle Enter key to send the message (or images), Shift+Enter for multiline
  const handleTextKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event);
    }
  };

  // Handle the message sending (including images and text)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && imagePreviews.length === 0) return;

    const newMessage = {
      _id: Date.now().toString(),
      senderId: "12345", // Replace with actual sender ID (e.g., from authUser)
      text: text.trim(),
      images: imagePreviews,
      createdAt: new Date().toISOString(),
    };

    // Send the message via parent callback
    onSendMessage(newMessage);

    // Clear text and images
    setText("");
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Simulate fake reply if selected user is online
    if (selectedUser && onlineUsers.includes(selectedUser._id)) {
      setTimeout(() => {
        const fakeReply = {
          _id: Date.now().toString(),
          senderId: selectedUser._id,
          text: "This is a simulated reply!", // No image in simulated reply
          createdAt: new Date().toISOString(),
        };
        onSendMessage(fakeReply);
      }, 2000);
    }
  };

  // Fullscreen image modal functionality (for preview images)
  const openFullScreen = (imageSrc, index) => {
    setFullscreenImage(imageSrc);
    setCurrentImageIndex(index);
  };

  const closeFullScreen = () => {
    setFullscreenImage(null);
    setCurrentImageIndex(0);
  };

  // Fullscreen navigation
  useEffect(() => {
    const handleFullScreenKeyDown = (event) => {
      if (!fullscreenImage) return;

      if (event.key === "ArrowRight") {
        setCurrentImageIndex((prevIndex) =>
          prevIndex + 1 < imagePreviews.length ? prevIndex + 1 : 0,
        );
      } else if (event.key === "ArrowLeft") {
        setCurrentImageIndex((prevIndex) =>
          prevIndex - 1 >= 0 ? prevIndex - 1 : imagePreviews.length - 1,
        );
      } else if (event.key === "Escape") {
        closeFullScreen();
      }
    };

    window.addEventListener("keydown", handleFullScreenKeyDown);
    return () => window.removeEventListener("keydown", handleFullScreenKeyDown);
  }, [fullscreenImage, imagePreviews]);

  // Update fullscreen image when current index changes (if modal is open)
  useEffect(() => {
    if (fullscreenImage && imagePreviews.length > 0) {
      setFullscreenImage(imagePreviews[currentImageIndex]);
    }
  }, [currentImageIndex, imagePreviews, fullscreenImage]);

  return (
    <div className="p-4 w-full">
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
          onClick={closeFullScreen}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Display selected image previews */}
      {imagePreviews.length > 0 && (
        <div className="mb-3 flex gap-2">
          {imagePreviews.map((preview, index) => (
            <div className="relative" key={index}>
              <img
                src={preview}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700 cursor-pointer"
                onClick={() => openFullScreen(preview, index)}
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message input and image upload form */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2"
        // yyyyy
      >
        <div className="flex-1 flex gap-2">
          <textarea
            rows={1}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleTextKeyDown} // Handle Enter to send message
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
            className={`hidden sm:flex btn btn-circle ${imagePreviews.length > 0 ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && imagePreviews.length === 0} // Prevent sending if no text or images
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatMessages;
