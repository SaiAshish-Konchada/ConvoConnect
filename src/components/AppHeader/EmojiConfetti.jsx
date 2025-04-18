import { useEffect, useState } from "react";

// Emoji Confetti Component
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

export default EmojiConfetti;
