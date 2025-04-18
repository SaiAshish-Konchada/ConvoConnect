import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const vibes = [
  { message: "Feeling fabulous ✨", emoji: "✨", range: 4 },
  { message: "Chill mode: ON 😌", emoji: "😌", range: 1 },
  { message: "Ready to shine 🌟", emoji: "🌟", range: 5 },
  { message: "Too cool for school 😎", emoji: "😎", range: 3 },
  { message: "Just vibin' 🎧", emoji: "🎧", range: 2 },
];

export const useProfileData = () => {
  const { authUser, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [vibeMessage, setVibeMessage] = useState("");
  const [emoji, setEmoji] = useState("");
  const [mood, setMood] = useState(3);

  useEffect(() => {
    const selectedVibe = vibes.find((v) => v.range === mood);
    if (selectedVibe) {
      setVibeMessage(selectedVibe.message);
      setEmoji(selectedVibe.emoji);
    }
  }, [mood]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setSelectedImg(reader.result);
  };

  return {
    authUser,
    isUpdatingProfile,
    selectedImg,
    mood,
    setMood,
    emoji,
    vibeMessage,
    handleImageUpload,
  };
};
