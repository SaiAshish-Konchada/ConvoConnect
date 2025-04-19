import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

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

AvatarSection.propTypes = {
  avatar: PropTypes.string.isRequired, // Ensure avatar is a required string (URL)
  message: PropTypes.string.isRequired, // Ensure message is a required string
  progressWidth: PropTypes.string.isRequired, // Ensure progressWidth is a required string (CSS width like "50%")
};

export default AvatarSection;
