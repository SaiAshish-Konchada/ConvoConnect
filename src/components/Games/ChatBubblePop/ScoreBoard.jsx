// /src/components/ChatBubblePop/ScoreBoard.js

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
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
// PropTypes validation for the ScoreBoard component
ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired, // The current score in the game
  gameOver: PropTypes.bool.isRequired, // A boolean indicating if the game is over
  onReset: PropTypes.func.isRequired, // Function to reset the game
};
export default ScoreBoard;
