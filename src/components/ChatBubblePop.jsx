import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: random velocity between -50 and 50 px/sec
const randomVel = () => (Math.random() - 0.5) * 100;

const ChatBubblePop = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);
  const popAudioRef = useRef(null);

  // Start game timer
  useEffect(() => {
    timerRef.current = setTimeout(() => setGameOver(true), 30000); // 30s game
    return () => clearTimeout(timerRef.current);
  }, []);

  // Spawn bubbles periodically
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => createBubble(), 800);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Create a bubble from a random edge
  const createBubble = () => {
    const edges = ["top", "bottom", "left", "right"];
    const edge = edges[Math.floor(Math.random() * edges.length)];
    let x, y;
    if (edge === "top") {
      x = Math.random() * 100;
      y = 0;
    } else if (edge === "bottom") {
      x = Math.random() * 100;
      y = 100;
    } else if (edge === "left") {
      x = 0;
      y = Math.random() * 100;
    } else {
      x = 100;
      y = Math.random() * 100;
    }
    const id = Date.now() + Math.random();
    const points = [5, 10, 15][Math.floor(Math.random() * 3)];
    setBubbles((prev) => [
      ...prev,
      { id, x, y, dx: randomVel(), dy: randomVel(), points },
    ]);
  };

  const handlePop = (id, points) => {
    if (popAudioRef.current) popAudioRef.current.play();
    setScore((s) => s + points);
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  const resetGame = () => {
    clearTimeout(timerRef.current);
    setBubbles([]);
    setScore(0);
    setGameOver(false);
    timerRef.current = setTimeout(() => setGameOver(true), 30000);
  };

  return (
    <div className="relative w-full h-full p-6 bg-base-100 overflow-hidden">
      {/* Timer Bar */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-primary"
        initial={{ width: "100%" }}
        animate={{ width: gameOver ? 0 : "100%" }}
        transition={{ duration: 30, ease: "linear" }}
      />

      {/* Score & Game Over Button */}
      <div className="flex justify-between items-center mb-4">
        <motion.div
          key={score}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold"
        >
          Score: {score}
        </motion.div>
        {gameOver && (
          <motion.button
            className="btn btn-primary"
            onClick={resetGame}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Play Again
          </motion.button>
        )}
      </div>

      {/* Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full p-4 bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg cursor-pointer flex items-center justify-center"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          initial={{ scale: 0 }}
          animate={{
            x: [`${b.x}%`, `${b.x + b.dx * 0.1}%`, `${b.x}%`],
            y: [`${b.y}%`, `${b.y + b.dy * 0.1}%`, `${b.y}%`],
            scale: [1, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.3, boxShadow: "0 0 8px rgba(0,0,0,0.3)" }}
          onClick={() => handlePop(b.id, b.points)}
        >
          <span className="text-white font-bold">{b.points}</span>
          {/* Pop Animation */}
          <AnimatePresence>
            {/* Using feedback could add burst effect here */}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Game Over Overlay */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 text-center space-y-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-3xl font-bold">Game Over</h2>
              <p className="text-2xl">Your Score: {score}</p>
              <motion.button
                className="btn btn-primary"
                onClick={resetGame}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Replay
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBubblePop;
