// /src/components/ChatBubblePop/GameTimer.js

import React from "react";
import { motion } from "framer-motion";

const GameTimer = ({ gameOver }) => (
  <motion.div
    className="absolute top-0 left-0 h-2 bg-primary"
    initial={{ width: "100%" }}
    animate={{ width: gameOver ? 0 : "100%" }}
    transition={{ duration: 30, ease: "linear" }}
  />
);

export default GameTimer;
