import { motion } from "framer-motion";
import PropTypes from "prop-types";
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
// PropTypes validation for ConfettiPiece component
ConfettiPiece.propTypes = {
  x: PropTypes.number.isRequired, // Horizontal position of the confetti piece
  color: PropTypes.string.isRequired, // Color of the confetti piece
};

export default ConfettiPiece;
