// src/components/Settings/EmojiExplosion.jsx

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
  
  export default EmojiExplosion;
  