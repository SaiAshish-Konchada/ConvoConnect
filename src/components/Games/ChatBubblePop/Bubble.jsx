// /src/components/ChatBubblePop/Bubble.js

import React from "react";
import { motion } from "framer-motion";

const Bubble = ({ id, x, y, dx, dy, points, onClick }) => {
  return (
    <motion.div
      key={id}
      className="absolute rounded-full p-4 bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg cursor-pointer flex items-center justify-center"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0 }}
      animate={{
        x: [`${x}%`, `${x + dx * 0.1}%`, `${x}%`],
        y: [`${y}%`, `${y + dy * 0.1}%`, `${y}%`],
        scale: [1, 1.2, 1],
      }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      whileHover={{ scale: 1.3, boxShadow: "0 0 8px rgba(0,0,0,0.3)" }}
      onClick={() => onClick(id, points)}
    >
      <span className="text-white font-bold">{points}</span>
    </motion.div>
  );
};

export default Bubble;
