import { create } from "zustand";
import toast from "react-hot-toast";
import profilePic from "../assets/profilepic.png"; // ✅ Import the image properly

// Mock user data for authentication
const MOCK_USER = {
  _id: "12345",
  username: "saiashish",
  fullName: "Sai Ashish",
  profilePic: profilePic, // ✅ Use imported image
  email: "mock@example.com",
};

// Zustand store for authentication and user state management
export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Load from localStorage
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check authentication status (simulated)
  checkAuth: async () => {
    try {
      await new Promise((r) => setTimeout(r, 500)); // Simulate API call delay
      set({ authUser: null, isCheckingAuth: false });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ isCheckingAuth: false });
    }
  },

  // Signup logic (mock)
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

  // Login logic (mock)
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

  // Logout logic (mock)
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

  // Update profile (mock)
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

  // Socket connection logic (mock)
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) return;

    const onlineUserIds = ["1", "2"]; // Mock online users
    set({ onlineUsers: onlineUserIds });
  },

  // Disconnect socket logic (mock)
  disconnectSocket: () => {
    set({ onlineUsers: [] });
  },

  // Add user to online users list
  userOnline: (userId) => {
    set((state) => {
      if (!state.onlineUsers.includes(userId)) {
        return { onlineUsers: [...state.onlineUsers, userId] };
      }
    });
  },

  // Remove user from online users list
  userOffline: (userId) => {
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((id) => id !== userId),
    }));
  },
}));
