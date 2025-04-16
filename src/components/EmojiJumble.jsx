import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Array of puzzles with emojis and their corresponding answers
const puzzles = [
  { emojis: "🍕🐱", answer: "pizza cat" },
  { emojis: "🌳🏠", answer: "tree house" },
  { emojis: "🧠🎮", answer: "brain game" },
  { emojis: "🧑‍💻🌍", answer: "logical world" },
];

// Helper to pick a random puzzle, optionally excluding the current answer
const getRandomPuzzle = (excludeAnswer) => {
  const options = puzzles.filter((p) => p.answer !== excludeAnswer);
  return options[Math.floor(Math.random() * options.length)];
};

const EmojiJumble = () => {
  const [puzzle, setPuzzle] = useState(() => getRandomPuzzle());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [confetti, setConfetti] = useState([]);

  // Launch simple confetti effect
  const launchConfetti = () => {
    const pieces = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      x: Math.random() * 200 - 100,
    }));
    setConfetti(pieces);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === puzzle.answer) {
      setScore((s) => s + 10);
      setFeedback("correct");
      launchConfetti();
      // After celebration, load next puzzle
      setTimeout(() => {
        const next = getRandomPuzzle(puzzle.answer);
        setPuzzle(next);
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
    setInput("");
  };

  return (
    <div className="relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center space-y-6 overflow-hidden">
      {/* Scoreboard */}
      <motion.div
        className="text-xl font-bold"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6 }}
      >
        Score: {score}
      </motion.div>

      {/* Emoji Puzzle */}
      <motion.div
        key={puzzle.emojis}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-6xl"
      >
        {puzzle.emojis}
      </motion.div>

      {/* Input & Submit */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Type your guess..."
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="btn btn-primary w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>

      {/* Feedback Messages */}
      <AnimatePresence>
        {feedback === "correct" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-green-500 font-semibold"
          >
            Correct! 🎉
          </motion.div>
        )}
        {feedback === "wrong" && (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: [10, -10, 10, 0] }}
            exit={{ opacity: 0 }}
            className="text-red-500 font-semibold"
          >
            Try Again! 😢
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ x: piece.x, y: 0, opacity: 1 }}
            animate={{ y: 200, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-2 h-2 rounded-sm"
            style={{
              left: `calc(50% + ${piece.x}px)`,
              top: "20%",
              backgroundColor: piece.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmojiJumble;
