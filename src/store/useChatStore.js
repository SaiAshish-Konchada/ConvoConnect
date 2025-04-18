import { create } from "zustand";

// ✅ Importing images
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";
import group1 from "../assets/group1.png";
import group2 from "../assets/group2.png";

// Mock data for users and groups
const MOCK_USERS = [
  {
    _id: "1",
    username: "John Doe",
    profilePic: person1,
    fullName: "John Doe",
  },
  {
    _id: "2",
    username: "Jane Smith",
    profilePic: person2,
    fullName: "Jane Smith",
  },
  {
    _id: "3",
    username: "Mark Lee",
    profilePic: person3,
    fullName: "Mark Lee",
  },
];

const MOCK_GROUPS = [
  {
    _id: "g1",
    name: "Dev Team",
    groupPic: group1,
    members: ["1", "2", "3"],
    onlineStatus: {
      1: true,
      2: true,
      3: false,
    },
  },
  {
    _id: "g2",
    name: "Friends",
    groupPic: group2,
    members: ["1", "2"],
    onlineStatus: {
      1: true,
      2: false,
    },
  },
];

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  selectedUser: null,
  selectedGroup: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],
  messageInterval: null,

  // Load users and groups (mock data)
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      set({ users: MOCK_USERS, isUsersLoading: false });
    } catch (error) {
      console.error("Failed to load users:", error);
      set({ isUsersLoading: false });
    }
  },

  getGroups: async () => {
    try {
      set({ groups: MOCK_GROUPS });
    } catch (error) {
      console.error("Failed to load groups:", error);
    }
  },

  // Get messages for the selected user or group
  getMessages: async (userOrGroupId) => {
    set({ isMessagesLoading: true });
    try {
      set({
        messages: [
          { _id: "1", senderId: userOrGroupId, text: "Hello!", createdAt: new Date().toISOString() },
          { _id: "2", senderId: "12345", text: "Hi, group or user!", createdAt: new Date().toISOString() },
        ],
        isMessagesLoading: false,
      });
    } catch (error) {
      console.error("Failed to load messages:", error);
      set({ isMessagesLoading: false });
    }
  },

  // Send a message and simulate a reply
  sendMessage: async (messageData) => {
    const { messages, selectedGroup, selectedUser, onlineUsers, groups } = get();
    set({ messages: [...messages, messageData] });

    if (selectedGroup) {
      handleGroupReply(selectedGroup, onlineUsers, groups);
    } else if (selectedUser && onlineUsers.includes(selectedUser._id)) {
      handleUserReply(selectedUser);
    }
  },

  // Function to handle group replies
  handleGroupReply: (selectedGroup, onlineUsers, groups) => {
    const group = groups.find((g) => g._id === selectedGroup._id);
    if (!group) return;

    const otherMembers = group.members.filter((id) => id !== "12345");
    const onlineMembers = otherMembers.filter((id) => onlineUsers.includes(id));

    if (onlineMembers.length > 0) {
      const randomUser = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
      simulateTypingStatus(randomUser, group);
    }
  },

  // Function to simulate user replies in 1-on-1 chat
  handleUserReply: (selectedUser) => {
    setTimeout(() => {
      const reply = {
        _id: Date.now().toString(),
        senderId: selectedUser._id,
        text: "This is a fake 1-on-1 reply!",
        createdAt: new Date().toISOString(),
      };
      set({ messages: [...get().messages, reply] });
    }, 2000);
  },

  // Simulate typing status for a user in a group
  simulateTypingStatus: (userId, group) => {
    setUserTypingStatus(userId, true);
    setTimeout(() => {
      setUserTypingStatus(userId, false);
      const reply = {
        _id: Date.now().toString(),
        groupId: group._id,
        senderId: userId,
        text: "This is a fake group reply!",
        createdAt: new Date().toISOString(),
      };
      set({ messages: [...get().messages, reply] });
    }, 2000);
  },

  // Subscribe to message updates every 5 seconds
  subscribeToMessages: () => {
    const { selectedUser, selectedGroup } = get();
    if (!selectedUser && !selectedGroup) return;

    const messageInterval = setInterval(() => {
      if (get().onlineUsers.includes(selectedUser?._id || selectedGroup?._id)) {
        const newMessage = {
          _id: Date.now().toString(),
          senderId: selectedUser?._id || selectedGroup?._id,
          text: "Simulated incoming message.",
          createdAt: new Date().toISOString(),
        };
        set({ messages: [...get().messages, newMessage] });
      }
    }, 5000);

    set({ messageInterval });
  },

  unsubscribeFromMessages: () => {
    const { messageInterval } = get();
    if (messageInterval) {
      clearInterval(messageInterval);
      set({ messageInterval: null });
    }
  },

  // Set selected user or group
  setSelectedUser: (user) => {
    set({ selectedUser: user, selectedGroup: null });
  },

  setSelectedGroup: (group) => {
    set({ selectedGroup: group, selectedUser: null });
  },

  // Set typing status for a user
  setUserTypingStatus: (userId, isTyping) => {
    const { groups } = get();
    const updatedGroups = groups.map((group) => {
      if (group.members.includes(userId)) {
        return {
          ...group,
          typingStatus: {
            ...(group.typingStatus || {}),
            [userId]: isTyping,
          },
        };
      }
      return group;
    });
    set({ groups: updatedGroups });
  },
}));
