import { motion } from "framer-motion";

const ScoreDisplay = ({ score }) => (
  <motion.div
    className="text-xl font-bold text-black"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 0.6 }}
  >
    Score: {score}
  </motion.div>
);

export default ScoreDisplay;
