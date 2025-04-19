import { create } from "zustand";
import toast from "react-hot-toast";
import profilePic from "../assets/profilepic.png"; // ✅ Import the image properly

const MOCK_USER = {
  _id: "12345",
  username: "saiashish",
  fullName: "Sai Ashish",
  profilePic: profilePic, // ✅ Use imported image
  email: "mock@example.com",
};

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Load from localStorage
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      if (storedUser) {
        set({ authUser: storedUser });
      } else {
        set({ authUser: null });
      }
      set({ isCheckingAuth: false });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await new Promise((r) => setTimeout(r, 500)); // Simulate network delay
      const newUser = { ...MOCK_USER, ...data };
      set({ authUser: newUser });
      toast.success("Account created successfully (mock)");
      localStorage.setItem("authUser", JSON.stringify(newUser)); // Persist in localStorage
      get().connectSocket();
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      await new Promise((r) => setTimeout(r, 500)); // Simulate network delay
      const loggedUser = { ...MOCK_USER, ...data };
      set({ authUser: loggedUser });
      toast.success("Logged in successfully (mock)");
      localStorage.setItem("authUser", JSON.stringify(loggedUser)); // Persist in localStorage
      get().connectSocket();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await new Promise((r) => setTimeout(r, 300)); // Simulate network delay
      set({ authUser: null, onlineUsers: [] });
      toast.success("Logged out successfully (mock)");
      localStorage.removeItem("authUser"); // Remove from localStorage
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      await new Promise((r) => setTimeout(r, 400)); // Simulate network delay
      set((state) => {
        const updatedUser = { ...state.authUser, ...data };
        localStorage.setItem("authUser", JSON.stringify(updatedUser)); // Persist in localStorage
        return { authUser: updatedUser };
      });
      toast.success("Profile updated successfully (mock)");
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) return;

    const onlineUserIds = ["1", "2"]; // Mock online users
    set({ onlineUsers: onlineUserIds });
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
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((id) => id !== userId),
    }));
  },
}));
