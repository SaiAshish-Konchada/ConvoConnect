import React from "react";
import { motion } from "framer-motion";

const AvatarSection = ({ avatar, message, progressWidth }) => (
  <div className="flex flex-col items-center gap-2 mb-4 pt-12 sm:pt-0">
    <motion.img
      src={avatar}
      alt="Signup avatar"
      className="w-24 h-24 rounded-full border-4 border-primary"
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <motion.p
      key={message}
      className="text-base text-base-content font-semibold text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.p>
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: progressWidth }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </div>
);

export default AvatarSection;
