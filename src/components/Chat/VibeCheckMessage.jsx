import PropTypes from "prop-types";
const VibeCheckMessage = ({ message, emoji }) => (
  <div className="fixed top-20 left-0 w-full flex flex-col items-center z-50 pointer-events-none">
    <div className="emoji-zoom mb-2 text-6xl">{emoji}</div>
    <div className="p-3 px-5 bg-primary text-white rounded-xl shadow-md text-lg font-semibold animate-fadeIn">
      {message}
    </div>
  </div>
);

VibeCheckMessage.propTypes = {
  message: PropTypes.string.isRequired, // message should be a string and is required
  emoji: PropTypes.string.isRequired, // emoji should be a string and is required
};
export default VibeCheckMessage;
