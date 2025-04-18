import { motion } from "framer-motion";
import EmojiJumble from "../Games/EmojiJumble/EmojiJumble";
import ChatBubblePop from "../Games/ChatBubblePop/ChatBubblePop";
import ChatWordScramble from "../Games/ChatWordScramble";

const GameRenderer = ({ selectedGame }) => {
  return (
    <motion.section
      key={selectedGame}
      className="w-full h-full flex items-center justify-center pt-16 md:pt-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {selectedGame === "emojiJumble" && <EmojiJumble />}
      {selectedGame === "bubblePop" && <ChatBubblePop />}
      {selectedGame === "wordScramble" && <ChatWordScramble />}
    </motion.section>
  );
};

export default GameRenderer;
