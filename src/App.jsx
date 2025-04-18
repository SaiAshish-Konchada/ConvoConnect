import { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import AppHeader from "./components/AppHeader/AppHeader";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import EmojiConfetti from "./components/AppHeader/EmojiConfetti";
import VibeCheckMessage from "./components/Chat/VibeCheckMessage";

// Utility for theme cursor map
import { themeCursorMap } from "./utils/themeCursorMap";

// Import styles from an external CSS file (instead of inline styles)
import "./styles.css";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const [vibeMessage, setVibeMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showZoomEmoji, setShowZoomEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  // Vibe options array
  const vibes = [
    { message: "You're on fire! 🔥", emoji: "🔥" },
    { message: "Chill vibes only 🌴", emoji: "🌴" },
    { message: "Vibe level: 100% 💯", emoji: "💯" },
    { message: "Looking sharp today! 👀", emoji: "👀" },
    { message: "Keep slaying! 💪", emoji: "💪" },
    { message: "You’re a legend today! 🏆", emoji: "🏆" },
  ];

  // Trigger vibe check, memoized
  const triggerVibeCheck = useCallback(() => {
    const vibe = vibes[Math.floor(Math.random() * vibes.length)];
    setVibeMessage(vibe.message);
    setSelectedEmoji(vibe.emoji);
    setShowZoomEmoji(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowZoomEmoji(false);
      setShowConfetti(false);
      setVibeMessage("");
    }, 3000);
  }, [vibes]);

  // Update the cursor emoji globally when theme changes
  useEffect(() => {
    document.body.style.cursor = `url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22><text x=%223%22 y=%2210%22 font-size=%2212%22>${themeCursorMap[theme]}</text></svg>'), auto`;
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <AppHeader onVibeClick={triggerVibeCheck} />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {showConfetti && <EmojiConfetti emoji={selectedEmoji} />}
      {showZoomEmoji && <VibeCheckMessage message={vibeMessage} emoji={selectedEmoji} />}
      <Toaster />
    </div>
  );
};

export default App;
