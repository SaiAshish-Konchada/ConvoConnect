import { create } from "zustand";

// ✅ Importing images
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";
import group1 from "../assets/group1.png";
import group2 from "../assets/group2.png";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  selectedUser: null,
  selectedGroup: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  messageInterval: null,
  onlineUsers: [],

  setOnlineUsers: (onlineUserIds) => {
    set({ onlineUsers: onlineUserIds });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    set({
      users: [
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
      ],
      isUsersLoading: false,
    });
  },

  getGroups: async () => {
    const mockGroups = [
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
    set({ groups: mockGroups });
  },

  getMessages: async (userOrGroupId) => {
    set({ isMessagesLoading: true });
    set({
      messages: [
        {
          _id: "1",
          senderId: userOrGroupId,
          text: "Hello!",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          senderId: "12345",
          text: "Hi, group or user!",
          createdAt: new Date().toISOString(),
        },
      ],
      isMessagesLoading: false,
    });
  },

  sendMessage: async (messageData) => {
    const {
      messages,
      selectedGroup,
      selectedUser,
      onlineUsers,
      groups,
      setUserTypingStatus,
    } = get();

    set({ messages: [...messages, messageData] });

    if (selectedGroup) {
      const group = groups.find((g) => g._id === selectedGroup._id);
      if (group) {
        const currentUserId = "12345";
        const otherMembers = group.members.filter((id) => id !== currentUserId);
        const onlineGroupMembers = otherMembers.filter((id) =>
          onlineUsers.includes(id),
        );

        if (onlineGroupMembers.length > 0) {
          const randomUser =
            onlineGroupMembers[
              Math.floor(Math.random() * onlineGroupMembers.length)
            ];

          setUserTypingStatus(randomUser, true);

          setTimeout(() => {
            setUserTypingStatus(randomUser, false);
            const reply = {
              _id: Date.now().toString(),
              groupId: selectedGroup._id,
              senderId: randomUser,
              text: "This is a fake group reply!",
              createdAt: new Date().toISOString(),
            };
            set({ messages: [...get().messages, reply] });
          }, 2000);
        }
      }
    } else if (selectedUser && onlineUsers.includes(selectedUser._id)) {
      setTimeout(() => {
        const reply = {
          _id: Date.now().toString(),
          senderId: selectedUser._id,
          text: "This is a fake 1-on-1 reply!",
          createdAt: new Date().toISOString(),
        };
        set({ messages: [...get().messages, reply] });
      }, 2000);
    }
  },

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

  setSelectedUser: (user) => {
    set({ selectedUser: user, selectedGroup: null });
  },

  setSelectedGroup: (group) => {
    set({ selectedGroup: group, selectedUser: null });
  },

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
