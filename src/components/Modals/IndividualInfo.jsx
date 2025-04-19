import { X } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import profilePic from "../../assets/profilepic.png";
import PropTypes from "prop-types";
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

const IndividualInfo = ({ onClose, onBlockUser }) => {
  const { theme } = useThemeStore();
  const [showZoomEmoji] = useState(false);
  const [vibeMessage] = useState("");
  const [selectedEmoji] = useState("🎉");

  const mockUserData = {
    fullName: "Jane Doe",
    profilePic: profilePic,
    description:
      "A quirky individual who loves coding, traveling, and chocolate!",
    phone: "987-654-3210",
    email: "jane.doe@example.com",
  };

  let backgroundClass;

  if (theme === "light") {
    backgroundClass = "bg-white";
  } else if (theme === "dark") {
    backgroundClass = "bg-[#1a202c]";
  } else if (theme === "coffee") {
    backgroundClass = "bg-[#3e2723]";
  } else if (theme === "synthwave") {
    backgroundClass = "bg-[#20143c]";
  } else {
    backgroundClass = "bg-gray-800";
  }

  const textColorClass = theme === "light" ? "text-black" : "text-white";

  return (
    <div data-theme={theme}>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 px-4">
        <div
          className={`${backgroundClass} ${textColorClass} w-full sm:max-w-md max-h-[90vh] p-5 sm:p-6 rounded-lg shadow-2xl overflow-y-auto`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {mockUserData.fullName}
            </h2>
            <button
              onClick={onClose}
              className="text-xl text-gray-300 hover:text-gray-500 focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src={mockUserData.profilePic}
              alt={mockUserData.fullName}
              className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover border-4 border-gray-700"
            />
          </div>

          {/* Description */}
          <p className="text-center text-sm sm:text-base mb-6">
            {mockUserData.description}
          </p>

          {/* Zoom Emoji & Message */}
          {showZoomEmoji && (
            <div className="fixed top-20 left-0 w-full flex flex-col items-center z-50 pointer-events-none">
              <div className="emoji-zoom mb-2 text-5xl sm:text-6xl">
                {selectedEmoji}
              </div>
              <div className="p-2 sm:p-3 px-4 sm:px-5 bg-primary text-white rounded-xl shadow-md text-base sm:text-lg font-semibold animate-fadeIn">
                {vibeMessage}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-md sm:text-lg font-semibold">Contact Info</h3>
            <p className="text-gray-300 text-sm">Phone: {mockUserData.phone}</p>
            <p className="text-gray-300 text-sm">Email: {mockUserData.email}</p>
          </div>

          {/* Block Button */}
          <div className="mt-6">
            <button
              onClick={onBlockUser}
              className="w-full py-2 bg-red-600 text-white text-base font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none"
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

IndividualInfo.propTypes = {
  // `user` should be an object containing the user's details.
  user: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming `id` is a string.
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onlineStatus: PropTypes.bool.isRequired, // Assuming this is a boolean indicating online status.
  }).isRequired,

  // `onClose` should be a function triggered to close the modal or component.
  onClose: PropTypes.func.isRequired,

  // `onBlockUser` should be a function that blocks the user, accepting the user's `id`.
  onBlockUser: PropTypes.func.isRequired,
};

export default IndividualInfo;
