import { motion } from "framer-motion";

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

export default IdleEmoji;
