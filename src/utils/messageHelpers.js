import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import profilepic from "../assets/profilepic.png";

// Helper function to get a default profile picture for fallback
const getDefaultProfilePic = (messageSenderId, authUser) => {
  if (messageSenderId === authUser._id) {
    return authUser.profilePic || profilepic;
  }
  return person2;
};

// Helper function to get avatar source based on sender ID
export const getAvatarSrc = (messageSenderId, selectedUser, authUser) => {
  if (!selectedUser) {
    return getDefaultProfilePic(messageSenderId, authUser); // Fallback when selectedUser is undefined
  }

  // Fallback avatar for special case (e.g., "john-doe-id")
  if (messageSenderId === "john-doe-id") {
    return person1; // John Doe's avatar
  }

  // If it's a group chat, return the appropriate profile picture
  if (
    selectedUser &&
    (selectedUser._id === "g1" || selectedUser._id === "g2")
  ) {
    return getDefaultProfilePic(messageSenderId, authUser);
  }

  // For a non-group chat, return the sender's profile picture or a default one
  return (
    selectedUser?.profilePic || getDefaultProfilePic(messageSenderId, authUser)
  );
};

// Helper function to get sender's name based on sender ID
export const getSenderName = (messageSenderId, selectedUser, authUser) => {
  if (!selectedUser) {
    return messageSenderId === authUser._id
      ? authUser.fullName
      : "Unknown User"; // Fallback when selectedUser is undefined
  }

  if (messageSenderId === "john-doe-id") return "John Doe";

  // Handling group chats
  if (
    selectedUser &&
    (selectedUser._id === "g1" || selectedUser._id === "g2")
  ) {
    return messageSenderId === authUser._id ? authUser.fullName : "John Doe";
  }

  // Handling one-on-one chats
  return messageSenderId === authUser._id
    ? authUser.fullName
    : selectedUser?.fullName || "Jane Smith";
};
