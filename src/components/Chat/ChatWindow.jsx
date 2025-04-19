import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import Placeholder from "../skeletons/MessageStructure";
import { formatMessageTime } from "../../lib/utils";
import GroupInfo from "../Modals/GroupInfoModal"; // Import GroupInfo modal
import { useThemeStore } from "../../store/useThemeStore";

// Importing images directly for React to handle the bundling
import person1 from "../../assets/person1.png"; // Imported person1 image
import person2 from "../../assets/person2.png"; // Imported person2 image
import profilepic from "../../assets/profilepic.png"; // Imported profile picture image

const ChatWindow = () => {
  const { theme } = useThemeStore();

  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-gray-800 text-white",
    blue: "bg-blue-500 text-white",
  };
  const {
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const messageEndRef = useRef(null);

  const [mockMessages, setMockMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [setCurrentImageIndex] = useState(0);
  const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false); // State to manage group info modal

  // Helper to get avatar based on message sender and chat type
  const getAvatarSrc = (messageSenderId) => {
    if (messageSenderId === "john-doe-id") {
      return person1; // John Doe's avatar
    }
    if (
      selectedUser &&
      (selectedUser._id === "g1" || selectedUser._id === "g2")
    ) {
      return messageSenderId === authUser._id
        ? authUser.profilePic || profilepic
        : person1;
    } else {
      return messageSenderId === authUser._id
        ? authUser.profilePic || profilepic
        : selectedUser?.profilePic || person2;
    }
  };

  const getSenderName = (messageSenderId) => {
    if (messageSenderId === "john-doe-id") return "John Doe";

    if (selectedUser && selectedUser._id === "g1") {
      return messageSenderId === authUser._id ? authUser.fullName : "John Doe";
    } else if (selectedUser && selectedUser._id === "g2") {
      return messageSenderId === authUser._id ? authUser.fullName : "John Doe";
    } else {
      return messageSenderId === authUser._id
        ? authUser.fullName
        : selectedUser?.fullName || "Jane Smith";
    }
  };

  const mockData = [
    {
      _id: "1",
      senderId: "12345",
      text: "Hello!",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      senderId: "67890",
      text: "Hi, how are you?",
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    if (!selectedUser) {
      setSelectedUser({
        _id: "67890",
        fullName: "John Doe",
        profilePic: person2, // Used imported image
        isGroup: true, // For testing group chat
      });
    }

    console.log("selectedUser in useEffect:", selectedUser); // Debugging log
    setMockMessages(mockData);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mockMessages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!fullscreenImage) return;

      const currentMessage = mockMessages.find((msg) =>
        msg?.images?.includes(fullscreenImage),
      );
      const imageIndex = currentMessage?.images?.indexOf(fullscreenImage);

      if (event.key === "ArrowRight" && currentMessage?.images?.length) {
        const nextIndex = (imageIndex + 1) % currentMessage.images.length;
        setFullscreenImage(currentMessage.images[nextIndex]);
      } else if (event.key === "ArrowLeft" && currentMessage?.images?.length) {
        const prevIndex =
          (imageIndex - 1 + currentMessage.images.length) %
          currentMessage.images.length;
        setFullscreenImage(currentMessage.images[prevIndex]);
      } else if (event.key === "Escape") {
        setFullscreenImage(null);
        setCurrentImageIndex(0);
      } else if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenImage, mockMessages]);

  const handleSendMessage = (newMessage) => {
    const messageToSend = {
      ...newMessage,
      createdAt: new Date().toISOString(),
    };

    setMockMessages((prevMessages) => [...prevMessages, messageToSend]);

    if (selectedUser && onlineUsers.includes(selectedUser._id)) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);

        // Handle group fake reply
        const isGroup = selectedUser._id === "g1" || selectedUser._id === "g2";
        const fakeReplySenderId = isGroup ? "john-doe-id" : selectedUser._id;

        const fakeReply = {
          _id: Date.now().toString(),
          senderId: fakeReplySenderId,
          text: "This is a simulated reply!",
          createdAt: new Date().toISOString(),
        };

        setMockMessages((prevMessages) => [
          ...prevMessages,
          { ...fakeReply, createdAt: new Date().toISOString() },
        ]);
      }, 2000);
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

  // Handle opening and closing Group Info modal

  const closeGroupInfo = () => {
    setIsGroupInfoOpen(false);
  };

  // Handle Leave Group functionality
  const handleLeaveGroup = () => {
    console.log("Leaving group...");
    setSelectedUser(null); // Clear the group selection
    setIsGroupInfoOpen(false); // Close modal
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <Placeholder />
        <ChatMessages onSendMessage={handleSendMessage} />
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col overflow-auto ${themeClasses[theme]}`}
    >
      <ChatHeader />

      {/* Group Info Modal */}
      {isGroupInfoOpen && selectedUser?.isGroup && (
        <GroupInfo
          group={selectedUser}
          onClose={closeGroupInfo}
          onLeaveGroup={handleLeaveGroup}
        />
      )}

      {fullscreenImage && (
        <button
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
          onClick={closeFullScreen}
          style={{ cursor: "pointer" }}
          aria-label="Close fullscreen image" // Describes the action for screen readers
          tabIndex={0} // Makes the button focusable
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              closeFullScreen(); // Activate on Enter or Space
            }
          }}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain"
          />
        </button>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={getAvatarSrc(message.senderId)} alt="profile pic" />
              </div>
            </div>

            {/* Name */}
            <div className="chat-header mb-1 font-semibold">
              {getSenderName(message.senderId)}
            </div>

            {/* Message bubble */}
            <div className="chat-bubble flex flex-col">
              {message.images?.map((image) => (
                <div key={image} className="mb-2">
                  <button
                    type="button"
                    className="sm:max-w-[200px] rounded-md cursor-pointer"
                    onClick={() => openFullScreen(image)}
                    aria-label="View attachment"
                    style={{ background: "none", border: "none" }}
                  >
                    <img
                      src={image}
                      alt="attachment"
                      className="max-w-full object-cover"
                    />
                  </button>
                </div>
              ))}
              {message.text && <p>{message.text}</p>}
            </div>

            {/* Time */}
            <time className="text-xs opacity-50 mt-1">
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={selectedUser?.profilePic || person2}
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-bubble flex items-center space-x-2">
              <div className="animate-pulse w-3 h-3 bg-gray-500 rounded-full" />
              <div className="animate-pulse w-3 h-3 bg-gray-500 rounded-full" />
              <div className="animate-pulse w-3 h-3 bg-gray-500 rounded-full" />
            </div>
          </div>
        )}
      </div>

      <ChatMessages onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
