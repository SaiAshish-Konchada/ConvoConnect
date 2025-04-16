import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [], // All group chats
  selectedUser: null,
  selectedGroup: null, // Selected group
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
          profilePic: "src/assets/person1.png",
          fullName: "John Doe",
        },
        {
          _id: "2",
          username: "Jane Smith",
          profilePic: "src/assets/person2.png",
          fullName: "Jane Smith",
        },
        {
          _id: "3",
          username: "Mark Lee",
          profilePic: "src/assets/person3.png",
          fullName: "Mark Lee",
        },
      ],
      isUsersLoading: false,
    });
  },

  getGroups: async () => {
    // Simulating group online/offline statuses for each member
    const mockGroups = [
      {
        _id: "g1",
        name: "Dev Team",
        groupPic: "src/assets/group1.png",
        members: ["1", "2", "3"], // Group members
        onlineStatus: {
          1: true, // John is online
          2: true, // Jane is online
          3: false, // Mark is offline
        },
      },
      {
        _id: "g2",
        name: "Friends",
        groupPic: "src/assets/group2.png",
        members: ["1", "2"], // Group members
        onlineStatus: {
          1: true, // John is online
          2: false, // Jane is offline
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

    // FAKE GROUP REPLY
    if (selectedGroup) {
      const group = groups.find((g) => g._id === selectedGroup._id);
      if (group) {
        const currentUserId = "12345"; // your fake current user ID
        const otherMembers = group.members.filter((id) => id !== currentUserId);
        const onlineGroupMembers = otherMembers.filter((id) =>
          onlineUsers.includes(id),
        );

        if (onlineGroupMembers.length > 0) {
          const randomUser =
            onlineGroupMembers[
              Math.floor(Math.random() * onlineGroupMembers.length)
            ];

          // Simulate typing
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

      // FAKE 1-on-1 REPLY
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
    set({ selectedUser: user, selectedGroup: null }); // Make sure to nullify selectedGroup
  },

  setSelectedGroup: (group) => {
    set({ selectedGroup: group, selectedUser: null }); // Make sure to nullify selectedUser
  },

  // New feature to simulate typing status for online users in group chats
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
