import React from "react";

const BadgeShowcase = () => {
  const badges = [
    "🌟 Super User",
    "🧠 Brainiac",
    "💬 Friendly",
    "🎯 Consistent",
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Badges 🏅</h2>
      <div className="flex flex-wrap gap-4">
        {badges.map((badge) => (
          <div
            key={badge} // Use the badge text itself as the unique key
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-md animate-bounce hover:scale-105 transition-transform"
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeShowcase;
