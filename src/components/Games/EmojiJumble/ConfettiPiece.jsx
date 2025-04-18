import { motion } from "framer-motion";

const ConfettiPiece = ({ x, color }) => (
  <motion.div
    initial={{ x, y: 0, opacity: 1 }}
    animate={{ y: 200, opacity: 0 }}
    transition={{ duration: 1 }}
    className="absolute w-2 h-2 rounded-sm"
    style={{
      left: `calc(50% + ${x}px)`,
      top: "20%",
      backgroundColor: color,
    }}
  />
);

export default ConfettiPiece;
