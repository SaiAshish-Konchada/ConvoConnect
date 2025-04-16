import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Smile, Sparkles, Star } from "lucide-react";
import clsx from "clsx";

const vibes = [
  { message: "Feeling fabulous ✨", emoji: "✨", range: 4 },
  { message: "Chill mode: ON 😌", emoji: "😌", range: 1 },
  { message: "Ready to shine 🌟", emoji: "🌟", range: 5 },
  { message: "Too cool for school 😎", emoji: "😎", range: 3 },
  { message: "Just vibin' 🎧", emoji: "🎧", range: 2 },
];

const ProfilePage = () => {
  const { authUser, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [vibeMessage, setVibeMessage] = useState("");
  const [emoji, setEmoji] = useState("");
  const [mood, setMood] = useState(3); // Default to a middle mood (3)

  const mockUpdateProfile = async (data) => {
    console.log("Updating profile with data: ", data);
    setTimeout(() => {
      console.log("Profile updated with: ", data);
    }, 1000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await mockUpdateProfile({ profilePic: base64Image });
    };
  };

  // Set the vibe based on the mood value
  const updateVibe = (moodValue) => {
    const selectedVibe = vibes.find((vibe) => vibe.range === moodValue);
    if (selectedVibe) {
      setVibeMessage(selectedVibe.message);
      setEmoji(selectedVibe.emoji);
    }
  };

  // Update vibe when mood changes
  useEffect(() => {
    updateVibe(mood);
  }, [mood]);

  return (
    <div className="h-full min-h-screen pt-20 overflow-y-auto bg-gradient-to-br from-base-100 to-base-300">
      <div className="max-w-3xl mx-auto p-6">
        {/* Vibe Section */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold flex justify-center items-center gap-2 animate-bounce">
            {emoji}
            {vibeMessage}
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl shadow-xl p-6 space-y-8 animate-fadeIn">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={"src/assets/profilepic.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-primary group-hover:scale-105 transition-transform duration-300 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={clsx(
                  "absolute bottom-0 right-0 bg-primary hover:scale-110 p-2 rounded-full cursor-pointer transition-all duration-200",
                  { "animate-pulse pointer-events-none": isUpdatingProfile },
                )}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-500">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera to update your pic"}
            </p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoField
              icon={<User className="w-4 h-4" />}
              label="Full Name"
              value={authUser?.fullName}
            />
            <InfoField
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value={authUser?.email}
            />
            <InfoField
              icon={<Smile className="w-4 h-4" />}
              label="Username"
              value={`@${authUser?.fullName?.split(" ")[0].toLowerCase()}`}
            />
            <InfoField
              icon={<Sparkles className="w-4 h-4" />}
              label="Bio"
              value="Just here to vibe, code, & sip coffee ☕"
            />
          </div>

          {/* Interests */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Interests 💡</h2>
            <div className="flex flex-wrap gap-3">
              {["Music", "Travel", "Coding", "Food", "Movies", "Gaming"].map(
                (interest, idx) => (
                  <span
                    key={idx}
                    className="bg-primary text-white px-3 py-1.5 rounded-full text-sm shadow hover:scale-105 transition-transform duration-200"
                  >
                    {interest}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Mood Slider */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Mood Today 😄</h2>
            <input
              type="range"
              min="1"
              max="5"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="range range-primary"
            />
            <div className="flex justify-between text-xs text-zinc-400 mt-1 px-1">
              <span>😴</span>
              <span>😐</span>
              <span>😊</span>
              <span>😄</span>
              <span>🤩</span>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6 shadow-inner">
            <h2 className="text-lg font-medium mb-4">Account Info 🗂️</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>2024</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Status</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Badge Showcase */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Badges 🏅</h2>
            <div className="flex flex-wrap gap-4">
              {[
                "🌟 Super User",
                "🧠 Brainiac",
                "💬 Friendly",
                "🎯 Consistent",
              ].map((badge, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-md animate-bounce hover:scale-105 transition-transform"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ icon, label, value }) => (
  <div className="space-y-1.5">
    <div className="text-sm text-zinc-500 flex items-center gap-2">
      {icon}
      {label}
    </div>
    <p className="px-4 py-2.5 bg-base-100 rounded-lg border border-zinc-600 shadow-inner">
      {value}
    </p>
  </div>
);

export default ProfilePage;
