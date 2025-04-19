// src/components/Settings/EmojiExplosion.jsx
import PropTypes from "prop-types";
const EmojiExplosion = ({ x, y, emoji }) => (
  <div
    className="emoji-explosion"
    style={{
      position: "absolute",
      top: y - 30 + "px",
      left: x - 30 + "px",
      fontSize: "40px",
      animation: "explode 1.5s ease-out forwards",
      zIndex: 10,
    }}
  >
    {emoji}
  </div>
);

EmojiExplosion.propTypes = {
  x: PropTypes.number.isRequired, // x coordinate for the explosion's position
  y: PropTypes.number.isRequired, // y coordinate for the explosion's position
  emoji: PropTypes.string.isRequired, // emoji to display in the explosion
};
export default EmojiExplosion;
