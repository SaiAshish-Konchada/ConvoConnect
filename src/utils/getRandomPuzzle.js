// File: utils/getRandomPuzzle.js
const puzzles = [
  { emojis: "🍕🐱", answer: "pizza cat" },
  { emojis: "🌳🏠", answer: "tree house" },
  { emojis: "🧠🎮", answer: "brain game" },
  { emojis: "🧑‍💻🌍", answer: "logical world" },
];

export const getRandomPuzzle = (excludeAnswer) => {
  const filtered = puzzles.filter((p) => p.answer !== excludeAnswer);
  return filtered[Math.floor(Math.random() * filtered.length)];
};
