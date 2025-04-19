import { motion } from "framer-motion";
import PropTypes from "prop-types";
const ToggleTrailButton = ({ enabled, onToggle }) => (
  <motion.button
    className="absolute top-6 left-6 btn btn-sm btn-outline hidden md:block"
    aria-label="Toggle emoji trail"
    onClick={onToggle}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
  >
    {enabled ? "Emoji Trail: On" : "Emoji Trail: Off"}
  </motion.button>
);
ToggleTrailButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleTrailButton;
