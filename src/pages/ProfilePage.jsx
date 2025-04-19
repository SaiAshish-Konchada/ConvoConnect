import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";
import clsx from "clsx";
import profilePic from "../assets/profilepic.png";

import InfoField from "../components/Profile/InfoField";
import Interests from "../components/Profile/Interests";
import MoodSlider from "../components/Profile/MoodSlider";
import BadgeShowcase from "../components/Profile/BadgeShowcase";
import VibeDisplay from "../components/Profile/VibeDisplay";

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
  const [mood, setMood] = useState(3);

  useEffect(() => {
    const selectedVibe = vibes.find((vibe) => vibe.range === mood);
    if (selectedVibe) {
      setVibeMessage(selectedVibe.message);
      setEmoji(selectedVibe.emoji);
    }
  }, [mood]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await mockUpdateProfile({ profilePic: base64Image });
    };
    reader.readAsDataURL(file);
  };

  const mockUpdateProfile = async (data) => {
    console.log("Updating profile with data: ", data);
    setTimeout(() => {
      console.log("Profile updated with: ", data);
    }, 1000);
  };

  return (
    <div className="h-full min-h-screen pt-20 overflow-y-auto bg-gradient-to-br from-base-100 to-base-300">
      <div className="max-w-3xl mx-auto p-6">
        <VibeDisplay emoji={emoji} message={vibeMessage} />

        <div className="bg-base-200 rounded-2xl shadow-xl p-6 space-y-8 animate-fadeIn">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || profilePic}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoField
              icon="user"
              label="Full Name"
              value={authUser?.fullName}
            />
            <InfoField icon="mail" label="Email" value={authUser?.email} />
            <InfoField
              icon="smile"
              label="Username"
              value={`@${authUser?.fullName?.split(" ")[0].toLowerCase()}`}
            />
            <InfoField
              icon="sparkles"
              label="Bio"
              value="Just here to vibe, code, & sip coffee ☕"
            />
          </div>

          <Interests
            interests={[
              "Music",
              "Travel",
              "Coding",
              "Food",
              "Movies",
              "Gaming",
            ]}
          />

          <MoodSlider mood={mood} setMood={setMood} />

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

          <BadgeShowcase
            badges={[
              "🌟 Super User",
              "🧠 Brainiac",
              "💬 Friendly",
              "🎯 Consistent",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
