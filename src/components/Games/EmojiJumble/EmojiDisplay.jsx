import { motion } from "framer-motion";

const EmojiDisplay = ({ emojis }) => (
  <motion.div
    key={emojis}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="text-6xl"
    aria-label="emoji puzzle"
  >
    {emojis}
  </motion.div>
);

export default EmojiDisplay;
