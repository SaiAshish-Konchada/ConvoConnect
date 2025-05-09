// /src/components/ChatBubblePop/GameOverOverlay.js

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
const GameOverOverlay = ({ score, gameOver, onReset }) => (
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
            onClick={onReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Replay"
          >
            Replay
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Define PropTypes for the GameOverOverlay component
GameOverOverlay.propTypes = {
  score: PropTypes.number.isRequired, // The final score, should be a number
  gameOver: PropTypes.bool.isRequired, // Boolean indicating if the game is over
  onReset: PropTypes.func.isRequired, // Function to reset the game, should be a function
};

export default GameOverOverlay;
