import { motion } from "framer-motion";
import PropTypes from "prop-types";

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
EmojiDisplay.propTypes = {
  emojis: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of emoji strings
};

export default EmojiDisplay;
