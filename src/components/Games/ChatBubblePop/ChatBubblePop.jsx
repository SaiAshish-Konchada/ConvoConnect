// /src/components/ChatBubblePop/ChatBubblePop.js

import React, { useState, useEffect, useRef } from "react";
import Bubble from "./Bubble";
import ScoreBoard from "./ScoreBoard";
import GameTimer from "./GameTimer";
import GameOverOverlay from "./GameOverOverlay";

// Helper: random velocity between -50 and 50 px/sec
const randomVel = () => (Math.random() - 0.5) * 100;

const ChatBubblePop = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);

  // Start game timer
  useEffect(() => {
    timerRef.current = setTimeout(() => setGameOver(true), 30000); // 30s game
    return () => clearTimeout(timerRef.current);
  }, []);

  // Spawn bubbles periodically
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => createBubble(), 800);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Create a bubble from a random edge
  const createBubble = () => {
    const edges = ["top", "bottom", "left", "right"];
    const edge = edges[Math.floor(Math.random() * edges.length)];
    let x, y;
    if (edge === "top") {
      x = Math.random() * 100;
      y = 0;
    } else if (edge === "bottom") {
      x = Math.random() * 100;
      y = 100;
    } else if (edge === "left") {
      x = 0;
      y = Math.random() * 100;
    } else {
      x = 100;
      y = Math.random() * 100;
    }
    const id = Date.now() + Math.random();
    const points = [5, 10, 15][Math.floor(Math.random() * 3)];
    setBubbles((prev) => [
      ...prev,
      { id, x, y, dx: randomVel(), dy: randomVel(), points },
    ]);
  };

  const handlePop = (id, points) => {
    setScore((s) => s + points);
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  const resetGame = () => {
    clearTimeout(timerRef.current);
    setBubbles([]);
    setScore(0);
    setGameOver(false);
    timerRef.current = setTimeout(() => setGameOver(true), 30000);
  };

  return (
    <div className="relative w-full h-full p-6 bg-base-100 overflow-hidden">
      <GameTimer gameOver={gameOver} />
      <ScoreBoard score={score} gameOver={gameOver} onReset={resetGame} />
      {bubbles.map((b) => (
        <Bubble key={b.id} {...b} onClick={handlePop} />
      ))}
      <GameOverOverlay score={score} onReset={resetGame} />
    </div>
  );
};

export default ChatBubblePop;
