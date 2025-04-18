import React from "react";

const Interests = () => {
  const interestList = ["Music", "Travel", "Coding", "Food", "Movies", "Gaming"];
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Interests 💡</h2>
      <div className="flex flex-wrap gap-3">
        {interestList.map((interest, idx) => (
          <span
            key={idx}
            className="bg-primary text-white px-3 py-1.5 rounded-full text-sm shadow hover:scale-105 transition-transform duration-200"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Interests;