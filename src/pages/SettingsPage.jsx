import { useState, useEffect, useMemo } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { PREVIEW_MESSAGES } from "../constants/previewMessages";
import { moodToThemes, themeCursorMap } from "../constants/themes";
import EmojiExplosion from "../components/Settings/EmojiExplosion";
import ThemeSelector from "../components/Settings/ThemeSelector";
import MoodSelector from "../components/Settings/MoodSelector";
import ThemePreview from "../components/Settings/ThemePreview";

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

  // Handle theme change and trigger emoji explosion
  const handleThemeChange = (newTheme, e) => {
    setTheme(newTheme);
    triggerEmojiExplosion(e.clientX, e.clientY);
  };

  // Handle mood change
  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  // Trigger emoji explosion at the given position
  const triggerEmojiExplosion = (x, y) => {
    setEmojiAnimation({ x, y });
    setTimeout(() => setEmojiAnimation(null), 1500); // Cleanup timeout if necessary
  };

  // Memoized filtered themes based on current mood
  const filteredThemes = useMemo(() => moodToThemes[mood] || [], [mood]);

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl transition-all duration-500 relative">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Mood Selector Component */}
        <MoodSelector mood={mood} onChange={handleMoodChange} />

        {/* Theme Selector Component */}
        <ThemeSelector
          filteredThemes={filteredThemes} // Prop passed correctly
          theme={theme} // Current theme
          handleThemeChange={handleThemeChange} // Event handler
        />

        {/* Emoji Explosion Animation */}
        {emojiAnimation && (
          <EmojiExplosion x={emojiAnimation.x} y={emojiAnimation.y} emoji={cursorEmoji} />
        )}

        <h3 className="text-lg font-semibold mb-3">Preview</h3>

        {/* Theme Preview Component */}
        <ThemePreview messages={PREVIEW_MESSAGES} />
      </div>
    </div>
  );
};

export default SettingsPage;
