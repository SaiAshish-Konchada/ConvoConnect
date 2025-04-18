import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { X } from "lucide-react";
import { useState } from "react";
import GroupInfo from "../Modals/GroupInfo"; // Import the GroupInfo component
import { Info } from "lucide-react"; // Import the Info icon for triggering the modal
import IndividualInfo from "../Modals/IndividualInfo"; // Import a new IndividualInfo component for individual chat info

// Importing images directly for React to handle the bundling
import group1 from "../../assets/group1.png"; // Imported group image
import profilepic from "../../assets/profilepic.png"; // Imported profile picture image

const ChatHeader = () => {
  const { selectedUser, selectedGroup, setSelectedUser, setSelectedGroup } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false); // Group modal state
  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false); // Individual modal state

  const group = selectedGroup || {
    name: "Dev Team",
    description: "A group for development, debugging, and design.",
    groupPic: group1, // Using the imported image
    members: ["John Doe", "Jane Smith", "Mark Lee"],
    onlineStatus: {
      "John Doe": true,
      "Jane Smith": false,
      "Mark Lee": true,
    },
  };

  if (!selectedUser && !group) return null;

  const handleClose = () => {
    setSelectedUser(null);
    setSelectedGroup(null);
    setIsGroupModalOpen(false);
    setIsIndividualModalOpen(false);
  };

  const isUserOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  const handleGroupClick = () => {
    setIsGroupModalOpen(!isGroupModalOpen); // Toggle group modal
    setIsIndividualModalOpen(false); // Close individual modal if opened
  };

  const handleUserClick = () => {
    setIsIndividualModalOpen(!isIndividualModalOpen); // Toggle individual modal
    setIsGroupModalOpen(false); // Close group modal if opened
  };

  const renderUserHeader = () => (
    <>
      <div
        className="avatar"
        onClick={handleUserClick}
        style={{ cursor: "pointer" }}
      >
        <div className="size-10 rounded-full">
          <img
            src={selectedUser.profilePic || profilepic} // Using the imported profile picture
            alt={selectedUser.fullName}
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <h3 className="font-medium">{selectedUser.fullName}</h3>
        <p className="text-sm text-base-content/70">
          {isUserOnline ? "Online" : "Offline"}
        </p>
      </div>
    </>
  );

  const renderGroupHeader = () => {
    const onlineCount = group.members.filter(
      (id) => group.onlineStatus?.[id] === true,
    ).length;
    const totalCount = group.members.length;

    return (
      <>
        <div
          className="avatar"
          onClick={handleGroupClick}
          style={{ cursor: "pointer" }}
        >
          <div className="size-10 rounded-full">
            <img
              src={
                group.groupPic ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(group.name)}&background=random`
              }
              alt={group.name}
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h3
            className="font-medium"
            onClick={handleGroupClick}
            style={{ cursor: "pointer" }}
          >
            {group.name}
          </h3>
          <p className="text-sm text-base-content/70">
            {onlineCount} online • {totalCount - onlineCount} offline
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="border-b border-base-300">
      <div className="p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedGroup ? renderGroupHeader() : renderUserHeader()}
        </div>

        {/* Wrap the Info icon button in a div to align it to the right */}
        <div className="flex items-center">
          <button
            onClick={() =>
              selectedGroup ? handleGroupClick() : handleUserClick()
            }
            className="text-xl"
          >
            <Info /> {/* Info icon */}
          </button>
          <button onClick={handleClose} className="ml-2">
            <X />
          </button>
        </div>
      </div>

      {/* Render Group Info Modal */}
      {selectedGroup && isGroupModalOpen && (
        <GroupInfo group={group} onClose={() => setIsGroupModalOpen(false)} />
      )}

      {/* Render Individual Info Modal for individual chats */}
      {selectedUser && isIndividualModalOpen && (
        <IndividualInfo
          user={selectedUser}
          onClose={() => setIsIndividualModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatHeader;