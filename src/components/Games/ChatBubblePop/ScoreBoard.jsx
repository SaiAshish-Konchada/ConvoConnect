// /src/components/ChatBubblePop/ScoreBoard.js

import React from "react";
import { motion } from "framer-motion";

const ScoreBoard = ({ score, gameOver, onReset }) => (
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
        onClick={onReset}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Play Again"
      >
        Play Again
      </motion.button>
    )}
  </div>
);

export default ScoreBoard;
