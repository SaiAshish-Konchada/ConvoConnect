import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmojiTrail from "./EmojiTrail";
import GameMenu from "./GameMenu";
import GameRenderer from "./GameRenderer";
import IdleEmoji from "./IdleEmoji";
import ToggleTrailButton from "./ToggleTrailButton";

const emojis = ["😂", "💬", "🔥", "✨", "🎉", "😜", "🤯", "😎", "🧠", "🎮"];

const IdleChatScreen = () => {
  const [gameSelected, setGameSelected] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [emojiTrail, setEmojiTrail] = useState([]);
  const [idleEmoji, setIdleEmoji] = useState(null);
  const [emojiTrailEnabled, setEmojiTrailEnabled] = useState(true);

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
    <main
      className="relative w-full h-full flex-1 flex flex-col items-center justify-center p-8 md:p-16 bg-base-100/50 overflow-hidden"
      onMouseMove={emojiTrailEnabled && !gameStarted ? handleMouseMove : undefined}
    >
      {emojiTrailEnabled && !gameStarted && <EmojiTrail trail={emojiTrail} />}
      {!gameStarted && !gameSelected && <IdleEmoji emoji={idleEmoji} />}
      {!gameStarted && (
        <ToggleTrailButton
          enabled={emojiTrailEnabled}
          onToggle={() => setEmojiTrailEnabled((prev) => !prev)}
        />
      )}

      <AnimatePresence>
        {!gameStarted && !gameSelected && (
          <GameMenu onStart={handleGameStart} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameStarted && gameSelected && (
          <GameRenderer selectedGame={gameSelected} />
        )}
      </AnimatePresence>

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
    </main>
  );
};

export default IdleChatScreen;
