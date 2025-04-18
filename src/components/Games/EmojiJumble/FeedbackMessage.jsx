import { motion, AnimatePresence } from "framer-motion";

const FeedbackMessage = ({ feedback }) => (
  <AnimatePresence>
    {feedback === "correct" && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        className="text-green-500 font-semibold"
      >
        Correct! 🎉
      </motion.div>
    )}
    {feedback === "wrong" && (
      <motion.div
        initial={{ x: -10 }}
        animate={{ x: [10, -10, 10, 0] }}
        exit={{ opacity: 0 }}
        className="text-red-500 font-semibold"
      >
        Try Again! 😢
      </motion.div>
    )}
  </AnimatePresence>
);

export default FeedbackMessage;
