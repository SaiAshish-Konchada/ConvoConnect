import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

// ✅ Import the image instead of using a relative path
import profilePic from "../assets/profilepic.png"; // Adjust path if needed

const themeEmojiMap = {
  light: "☀️",
  dark: "🌙",
  coffee: "☕",
  bumblebee: "🐝",
  pastel: "🌸",
  retro: "🎶",
};

const styles = `
@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes zoom {
  0% { transform: scale(0.2); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.emoji-bounce {
  animation: bounce 1s ease-in-out infinite;
}
.emoji-zoom {
  animation: zoom 0.6s ease-in-out;
}
`;

const IndividualInfo = ({ user, onClose, onBlockUser }) => {
  const { theme } = useThemeStore();
  const [showZoomEmoji, setShowZoomEmoji] = useState(false);
  const [vibeMessage, setVibeMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  const mockUserData = {
    fullName: "Jane Doe",
    profilePic: profilePic, // ✅ use imported image here
    description:
      "A quirky individual who loves coding, traveling, and chocolate!",
    phone: "987-654-3210",
    email: "jane.doe@example.com",
  };

  const backgroundClass =
    theme === "light"
      ? "bg-white"
      : theme === "dark"
        ? "bg-[#1a202c]"
        : theme === "coffee"
          ? "bg-[#3e2723]"
          : theme === "synthwave"
            ? "bg-[#20143c]"
            : "bg-gray-800";

  const textColorClass = theme === "light" ? "text-black" : "text-white";

  return (
    <div data-theme={theme}>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
        <div
          className={`${backgroundClass} ${textColorClass} p-6 rounded-lg shadow-2xl w-full sm:w-[480px] max-h-[90vh] overflow-y-auto transition-transform transform-gpu`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{mockUserData.fullName}</h2>
            <button
              onClick={onClose}
              className="text-xl text-gray-300 hover:text-gray-500 focus:outline-none transition-colors"
              aria-label="Close User Info"
            >
              <X />
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={mockUserData.profilePic}
              alt={mockUserData.fullName}
              className="rounded-full w-32 h-32 object-cover border-4 border-gray-700"
            />
          </div>

          <p className="text-center mb-6">{mockUserData.description}</p>

          {showZoomEmoji && (
            <div className="fixed top-20 left-0 w-full flex flex-col items-center z-50 pointer-events-none">
              <div className="emoji-zoom mb-2 text-6xl">{selectedEmoji}</div>
              <div className="p-3 px-5 bg-primary text-white rounded-xl shadow-md text-lg font-semibold animate-fadeIn">
                {vibeMessage}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-gray-300">Phone: {mockUserData.phone}</p>
            <p className="text-gray-300">Email: {mockUserData.email}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onBlockUser}
              className="w-full py-2 bg-red-600 text-white text-lg font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none"
            >
              Block
            </button>
          </div>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
};

export default IndividualInfo;
