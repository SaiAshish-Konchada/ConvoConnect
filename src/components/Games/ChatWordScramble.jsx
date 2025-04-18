import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Constants
const WORDS = ["LOL", "BRB", "EMOJI", "GIF", "MEME", "CHAT"];

// Utility to scramble letters
const scramble = (word) =>
  word.split("").sort(() => Math.random() - 0.5).join("");

const ChatWordScramble = () => {
  const [answer, setAnswer] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // "nice" or "almost"
  const [confetti, setConfetti] = useState([]);
  const [hintUsed, setHintUsed] = useState(false);

  // Launch confetti on correct answer
  const launchConfetti = () => {
    const pieces = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      x: Math.random() * 100,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2000);
  };

  // New round
  const newRound = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setAnswer(word);
    setScrambled(scramble(word));
    setInput("");
    setFeedback(null);
    setHintUsed(false);
  };

  // Init first round
  useEffect(() => {
    newRound();
  }, []);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toUpperCase() === answer) {
      setScore((prev) => prev + 10);
      setFeedback("nice");
      launchConfetti();
      setTimeout(newRound, 2000);
    } else {
      setFeedback("almost");
      setTimeout(() => setFeedback(null), 2000);
    }
    setInput("");
  };

  // Hint logic
  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      setInput(answer[0]);
    }
  };

  return (
    <div
      className="relative w-full max-w-md p-6 bg-blue-800 rounded-2xl shadow-md flex flex-col items-center space-y-6"
      role="region"
      aria-label="Chat Word Scramble Game"
    >
      {/* Score */}
      <motion.div
        className="text-xl font-semibold text-white"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6 }}
      >
        Score: {score}
      </motion.div>

      {/* Scrambled Word */}
      <motion.div
        key={scrambled}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-yellow-300"
        aria-label="Scrambled word"
      >
        {scrambled}
      </motion.div>

      {/* Input & Buttons */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center space-y-4"
        aria-label="Word input form"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered w-full max-w-sm text-center text-lg"
          placeholder="Type your guess..."
          aria-label="Guess the unscrambled word"
        />

        <div className="flex space-x-4">
          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>

          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={handleHint}
            disabled={hintUsed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-disabled={hintUsed}
            aria-label="Reveal a hint"
          >
            Hint
          </motion.button>
        </div>
      </form>

      {/* Feedback Banner */}
      <AnimatePresence>
        {feedback === "nice" && (
          <motion.div
            className="absolute top-4 bg-green-300 px-4 py-2 rounded-full shadow text-green-900 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
          >
            Nice! 🎉
          </motion.div>
        )}
        {feedback === "almost" && (
          <motion.div
            className="absolute top-4 bg-yellow-200 px-4 py-2 rounded-full shadow text-yellow-900 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
          >
            Almost there! 🤔
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Animation */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${piece.x}%`,
              top: "20%",
              backgroundColor: piece.color,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 200, opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatWordScramble;
