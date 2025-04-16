import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! Do you think this will win the UI Hackathon?",
    isSent: false,
  },
  { id: 2, content: "I hope so.", isSent: true },
];

const moodToThemes = {
  Happy: ["light", "cupcake", "bumblebee", "synthwave", "retro", "valentine"],
  Chill: ["lofi", "pastel", "aqua", "garden", "winter", "night"],
  Inspired: ["emerald", "forest", "fantasy", "cyberpunk", "business", "nord"],
  Excited: ["synthwave", "neon", "acid", "cmyk", "dracula", "autumn"],
};

const themeNames = {
  light: "Daydream",
  dark: "Midnight Vibes",
  cupcake: "Sugar Rush",
  bumblebee: "Golden Glow",
  emerald: "Greenhouse",
  corporate: "Executive Suite",
  synthwave: "Neon Rush",
  retro: "Throwback",
  cyberpunk: "Neon Future",
  valentine: "Heartbeats",
  halloween: "Spooky Night",
  garden: "Bloom",
  forest: "Woodland Mysteries",
  aqua: "Ocean Breeze",
  lofi: "Chill Zone",
  pastel: "Cotton Candy",
  fantasy: "Dreamscape",
  wireframe: "Sketch Mode",
  black: "Blackout",
  luxury: "Golden Era",
  dracula: "Vampire's Lair",
  cmyk: "Color Splash",
  autumn: "Falling Leaves",
  business: "Power Moves",
  acid: "Neon Acid",
  lemonade: "Zesty Lemon",
  night: "Starry Night",
  coffee: "Coffee Break",
  winter: "Frozen Wonderland",
  dim: "Twilight Hour",
  nord: "Northern Lights",
  sunset: "End of Day",
};

// Emoji Cursor Mapping for Each Theme
const themeCursorMap = {
  light: "😊", // Daydream
  dark: "🌙", // Midnight Vibes
  cupcake: "🍰", // Sugar Rush
  bumblebee: "🐝", // Golden Glow
  emerald: "🌿", // Greenhouse
  corporate: "💼", // Executive Suite
  synthwave: "🌸", // Neon Rush
  retro: "📼", // Throwback
  cyberpunk: "🤖", // Neon Future
  valentine: "💘", // Heartbeats
  halloween: "🎃", // Spooky Night
  garden: "🌺", // Bloom
  forest: "🌳", // Woodland Mysteries
  aqua: "🌊", // Ocean Breeze
  lofi: "🎧", // Chill Zone
  pastel: "🍬", // Cotton Candy
  fantasy: "🧚‍♂️", // Dreamscape
  wireframe: "✏️", // Sketch Mode
  black: "🖤", // Blackout
  luxury: "💎", // Golden Era
  dracula: "🧛‍♂️", // Vampire's Lair
  cmyk: "🎨", // Color Splash
  autumn: "🍂", // Falling Leaves
  business: "📈", // Power Moves
  acid: "☠️", // Neon Acid
  lemonade: "🍋", // Zesty Lemon
  night: "🌌", // Starry Night
  coffee: "☕", // Coffee Break
  winter: "❄️", // Frozen Wonderland
  dim: "🌑", // Twilight Hour
  nord: "❄️", // Northern Lights
  sunset: "🌅", // End of Day
};

const SettingsPage = () => {
  const { theme, setTheme, initializeTheme } = useThemeStore();
  const [cursorEmoji, setCursorEmoji] = useState(themeCursorMap[theme]);
  const [mood, setMood] = useState("Happy");
  const [emojiAnimation, setEmojiAnimation] = useState(null);

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, []);

  // Update cursor emoji when theme changes
  useEffect(() => {
    setCursorEmoji(themeCursorMap[theme]);
  }, [theme]);

  const handleThemeChange = (newTheme, e) => {
    setTheme(newTheme);
    triggerEmojiExplosion(e.clientX, e.clientY);
  };

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  const triggerEmojiExplosion = (x, y) => {
    setEmojiAnimation({ x, y });
    setTimeout(() => setEmojiAnimation(null), 1500);
  };

  const filteredThemes = moodToThemes[mood] || [];

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl transition-all duration-500">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Mood Picker */}
        <div className="flex gap-4 mb-6">
          {["Happy", "Chill", "Inspired", "Excited"].map((newMood) => (
            <button
              key={newMood}
              className={`p-2 rounded-lg ${mood === newMood ? "bg-primary text-primary-content" : "hover:bg-base-200/50"}`}
              onClick={() => handleMoodChange(newMood)}
            >
              {newMood}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {filteredThemes.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-300
                ${theme === t ? "bg-base-200 transform scale-105 shadow-xl" : "hover:bg-base-200/50 hover:scale-110 hover:shadow-xl"}`}
              onClick={(e) => handleThemeChange(t, e)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {themeNames[t] || t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Emoji Explosion Animation */}
        {emojiAnimation && (
          <div
            className="emoji-explosion"
            style={{
              position: "absolute",
              top: emojiAnimation.y - 30 + "px",
              left: emojiAnimation.x - 30 + "px",
              fontSize: "40px",
              animation: "explode 1.5s ease-out forwards",
              zIndex: 10,
            }}
          >
            {themeCursorMap[theme]}
          </div>
        )}

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
