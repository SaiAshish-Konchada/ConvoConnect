import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

// Emoji Cursor Mapping for Each Theme
const themeCursorMap = {
  light: "😊",
  dark: "🌙",
  cupcake: "🍰",
  bumblebee: "🐝",
  emerald: "🌿",
  corporate: "💼",
  synthwave: "🌸",
  retro: "📼",
  cyberpunk: "🤖",
  valentine: "💘",
  halloween: "🎃",
  garden: "🌺",
  forest: "🌳",
  aqua: "🌊",
  lofi: "🎧",
  pastel: "🍬",
  fantasy: "🧚‍♂️",
  wireframe: "✏️",
  black: "🖤",
  luxury: "💎",
  dracula: "🧛‍♂️",
  cmyk: "🎨",
  autumn: "🍂",
  business: "📈",
  acid: "☠️",
  lemonade: "🍋",
  night: "🌌",
  coffee: "☕",
  winter: "❄️",
  dim: "🌑",
  nord: "❄️",
  sunset: "🌅",
};

const styles = `
@keyframes zoom {
  0% { transform: scale(0.2); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes fall {
  0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
.emoji-zoom {
  animation: zoom 0.6s ease-in-out;
}
.emoji-fall {
  animation: fall linear;
  position: absolute;
  font-size: 1.5rem;
}
`;

const EmojiConfetti = ({ emoji }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }, () => ({
      id: Math.random().toString(36).substring(2),
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
    }));
    setEmojis(generated);

    const timeout = setTimeout(() => setEmojis([]), 3000);
    return () => clearTimeout(timeout);
  }, [emoji]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {emojis.map(({ id, left, duration }) => (
        <div
          key={id}
          style={{ left: `${left}%`, animationDuration: `${duration}s` }}
          className="emoji-fall"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const [vibeMessage, setVibeMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showZoomEmoji, setShowZoomEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  const vibes = [
    { message: "You're on fire! 🔥", emoji: "🔥" },
    { message: "Chill vibes only 🌴", emoji: "🌴" },
    { message: "Vibe level: 100% 💯", emoji: "💯" },
    { message: "Looking sharp today! 👀", emoji: "👀" },
    { message: "Keep slaying! 💪", emoji: "💪" },
    { message: "You’re a legend today! 🏆", emoji: "🏆" },
  ];

  const triggerVibeCheck = () => {
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
  };

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
      <style>{styles}</style>
      <AppHeader onVibeClick={triggerVibeCheck} />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      {showConfetti && <EmojiConfetti emoji={selectedEmoji} />}
      {showZoomEmoji && (
        <div className="fixed top-20 left-0 w-full flex flex-col items-center z-50 pointer-events-none">
          <div className="emoji-zoom mb-2 text-6xl">{selectedEmoji}</div>
          <div className="p-3 px-5 bg-primary text-white rounded-xl shadow-md text-lg font-semibold animate-fadeIn">
            {vibeMessage}
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default App;
