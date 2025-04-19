import { motion } from "framer-motion";
import PropTypes from "prop-types";
const IdleEmoji = ({ emoji }) => {
  if (!emoji) return null;

  return (
    <motion.div
      className="absolute bottom-8 text-4xl"
      initial={{ y: 0 }}
      animate={{ y: [-10, 0, -10] }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      {emoji}
    </motion.div>
  );
};

IdleEmoji.propTypes = {
  emoji: PropTypes.string.isRequired,
};

export default IdleEmoji;
