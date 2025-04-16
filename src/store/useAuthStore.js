import { create } from "zustand";
import toast from "react-hot-toast";

const MOCK_USER = {
  _id: "12345",
  username: "saiashish",
  fullName: "Sai Ashish",
  profilePic: "src/assets/profilepic.png",
  email: "mock@example.com",
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [], // The list of online user IDs
  socket: null,

  checkAuth: async () => {
    await new Promise((r) => setTimeout(r, 500));
    set({ authUser: null, isCheckingAuth: false });
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    await new Promise((r) => setTimeout(r, 500));
    const newUser = { ...MOCK_USER, ...data };
    set({ authUser: newUser });
    toast.success("Account created successfully (mock)");
    get().connectSocket();
    set({ isSigningUp: false });
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    await new Promise((r) => setTimeout(r, 500));
    const loggedUser = { ...MOCK_USER, ...data };
    set({ authUser: loggedUser });
    toast.success("Logged in successfully (mock)");
    get().connectSocket();
    set({ isLoggingIn: false });
  },

  logout: async () => {
    await new Promise((r) => setTimeout(r, 300));
    set({ authUser: null, onlineUsers: [] });
    toast.success("Logged out successfully (mock)");
    get().disconnectSocket();
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    await new Promise((r) => setTimeout(r, 400));
    set((state) => ({
      authUser: { ...state.authUser, ...data },
      isUpdatingProfile: false,
    }));
    toast.success("Profile updated successfully (mock)");
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) return;

    // Simulate the online users (IDs "1" and "2" are online)
    const onlineUserIds = ["1", "2"]; // Mock online users

    set({ onlineUsers: onlineUserIds }); // Set online users in the state
  },

  disconnectSocket: () => {
    set({ onlineUsers: [] });
  },

  userOnline: (userId) => {
    set((state) => {
      if (!state.onlineUsers.includes(userId)) {
        return { onlineUsers: [...state.onlineUsers, userId] };
      }
    });
  },

  userOffline: (userId) => {
    set((state) => {
      return { onlineUsers: state.onlineUsers.filter((id) => id !== userId) };
    });
  },
}));
