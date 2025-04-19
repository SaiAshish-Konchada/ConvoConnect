import { motion } from "framer-motion";
import PropTypes from "prop-types";
const GuessInputForm = ({ input, onInputChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="w-full flex flex-col space-y-4">
    <label htmlFor="guess" className="sr-only">
      Enter your guess
    </label>
    <motion.input
      id="guess"
      type="text"
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      className="input input-bordered w-full"
      placeholder="Type your guess..."
      whileFocus={{ scale: 1.02 }}
    />
    <motion.button
      type="submit"
      className="btn btn-primary w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Submit
    </motion.button>
  </form>
);
GuessInputForm.propTypes = {
  input: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GuessInputForm;
