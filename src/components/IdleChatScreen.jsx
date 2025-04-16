import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiJumble from "./EmojiJumble";
import ChatBubblePop from "./ChatBubblePop";
import ChatWordScramble from "./ChatWordScramble";

// Emoji trail for fun cursor effect
const emojis = ["😂", "💬", "🔥", "✨", "🎉", "😜", "🤯", "😎", "🧠", "🎮"];

const IdleChatScreen = () => {
  const [gameSelected, setGameSelected] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [emojiTrail, setEmojiTrail] = useState([]);
  const [idleEmoji, setIdleEmoji] = useState(null);
  const [emojiTrailEnabled, setEmojiTrailEnabled] = useState(true); // State to toggle emoji trail

  // Emoji Trail Animation (cursor)
  const handleMouseMove = (e) => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    setEmojiTrail((prev) => [
      ...prev,
      { x: e.clientX, y: e.clientY, emoji, id: Date.now() },
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiTrail((prev) => prev.slice(1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleGameStart = (game) => {
    setGameSelected(game);
    setGameStarted(true);
    setIdleEmoji(null);
  };

  const resetGame = () => {
    setGameSelected(null);
    setGameStarted(false);
  };

  return (
    <div
      className="relative w-full h-full flex-1 flex flex-col items-center justify-center p-8 md:p-16 bg-base-100/50 overflow-hidden"
      onMouseMove={
        emojiTrailEnabled && !gameStarted ? handleMouseMove : undefined
      }
    >
      {/* Emoji Cursor Trail */}
      {emojiTrailEnabled &&
        emojiTrail.map(({ x, y, emoji, id }) => (
          <motion.div
            key={id}
            className="fixed pointer-events-none text-2xl z-50"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.5 }}
            style={{
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {emoji}
          </motion.div>
        ))}

      {/* Idle Emoji Dance */}
      {idleEmoji && !gameStarted && !gameSelected && (
        <motion.div
          className="absolute bottom-8 text-4xl"
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {idleEmoji}
        </motion.div>
      )}

      {/* Toggle Emoji Trail Button */}
      <motion.button
        className="absolute top-6 right-6 btn btn-sm btn-outline"
        onClick={() => setEmojiTrailEnabled((prev) => !prev)}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: gameStarted ? "none" : "block" }} // Hide if game is started
      >
        {emojiTrailEnabled ? "Emoji Trail: On" : "Emoji Trail: Off"}
      </motion.button>

      {/* Game Menu */}
      <AnimatePresence>
        {!gameStarted && !gameSelected && (
          <motion.div
            key="game-menu"
            className="w-full max-w-xl text-center space-y-6 px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar */}
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="src/assets/welcome.png"
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto"
              />
            </motion.div>

            <motion.h2
              className="text-3xl font-extrabold tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              👋 Welcome to <span className="text-primary">ConvoConnect!</span>
            </motion.h2>

            <p className="text-base-content/70 font-medium">
              No one’s around? No problem—these games are all the company you
              need! 🎮🎉
            </p>

            <motion.div
              className="flex justify-center flex-wrap mt-4 gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <button
                className="btn btn-primary text-lg px-6 py-2 hover:animate-pulse"
                onClick={() => handleGameStart("emojiJumble")}
              >
                🤯 Emoji Jumble
              </button>
              <button
                className="btn btn-primary text-lg px-6 py-2 hover:animate-pulse"
                onClick={() => handleGameStart("bubblePop")}
              >
                💥 Bubble Pop
              </button>
              <button
                className="btn btn-primary text-lg px-6 py-2 hover:animate-pulse"
                onClick={() => handleGameStart("wordScramble")}
              >
                🧠 Word Scramble
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Screens */}
      <AnimatePresence>
        {gameStarted && gameSelected && (
          <motion.div
            key={gameSelected}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {gameSelected === "emojiJumble" && <EmojiJumble />}
            {gameSelected === "bubblePop" && <ChatBubblePop />}
            {gameSelected === "wordScramble" && <ChatWordScramble />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      {gameStarted && (
        <motion.button
          className="absolute top-6 right-6 btn btn-sm btn-outline"
          onClick={resetGame}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          ⬅️ Back to Game Selection
        </motion.button>
      )}
    </div>
  );
};

export default IdleChatScreen;
