import { motion } from "framer-motion";

const EmojiTrail = ({ trail }) => {
  return trail.map(({ x, y, emoji, id }) => (
    <motion.div
      key={id}
      className="fixed pointer-events-none text-2xl z-50"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.5 }}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {emoji}
    </motion.div>
  ));
};

export default EmojiTrail;
