import { motion } from "framer-motion";
import welcome from "../../assets/welcome.png";
import PropTypes from "prop-types";

const GameMenu = ({ onStart }) => (
  <motion.section
    key="game-menu"
    className="w-full max-w-xl text-center space-y-6 px-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div
      className="w-24 h-24 flex items-center justify-center mx-auto shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={welcome}
        alt="Welcome avatar"
        className="w-24 h-24 rounded-full border-4 border-primary"
      />
    </motion.div>

    <motion.h2
      className="text-3xl font-extrabold tracking-tight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      👋 Welcome to <span className="text-primary">ConvoConnect!</span>
    </motion.h2>

    <p className="text-base-content/70 font-medium">
      No one’s around? No problem—these games are all the company you need! 🎮🎉
    </p>

    <motion.div
      className="flex justify-center flex-wrap mt-4 gap-4"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 10 }}
    >
      <button
        className="btn btn-primary text-lg px-6 py-2 hover:animate-pulse"
        onClick={() => onStart("emojiJumble")}
      >
        🤯 Emoji Jumble
      </button>
      <button
        className="btn btn-primary text-lg px-6 py-2 hover:animate-pulse"
        onClick={() => onStart("bubblePop")}
      >
        💥 Bubble Pop
      </button>
      <button
        className="btn btn-primary text-lg px-6 py-2 hover:animate-pulse"
        onClick={() => onStart("wordScramble")}
      >
        🧠 Word Scramble
      </button>
    </motion.div>
  </motion.section>
);

GameMenu.propTypes = {
  onStart: PropTypes.func.isRequired,
};
export default GameMenu;
