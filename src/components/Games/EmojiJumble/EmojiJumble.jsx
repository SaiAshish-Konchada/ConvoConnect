// File: components/EmojiJumble/EmojiJumble.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomPuzzle } from "../../../utils/getRandomPuzzle";
import EmojiDisplay from "./EmojiDisplay";
import ScoreDisplay from "./ScoreDisplay";
import FeedbackMessage from "./FeedbackMessage";
import ConfettiPiece from "./ConfettiPiece";
import GuessInputForm from "./GuessInputForm";

const EmojiJumble = () => {
  const [puzzle, setPuzzle] = useState(() => getRandomPuzzle());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [confetti, setConfetti] = useState([]);

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
    const guess = input.trim().toLowerCase();
    if (guess === puzzle.answer) {
      setScore((prev) => prev + 10);
      setFeedback("correct");
      launchConfetti();

      setTimeout(() => {
        setPuzzle(getRandomPuzzle(puzzle.answer));
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
      <ScoreDisplay score={score} />
      <EmojiDisplay emojis={puzzle.emojis} />
      <GuessInputForm
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
      <FeedbackMessage feedback={feedback} />
      <AnimatePresence>
        {confetti.map((piece) => (
          <ConfettiPiece key={piece.id} {...piece} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmojiJumble;
