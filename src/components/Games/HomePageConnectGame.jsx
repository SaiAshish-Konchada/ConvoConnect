import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, MessageSquareHeart, Handshake } from "lucide-react";
import Confetti from "react-confetti"; // Import the confetti package

const ROWS = 6;
const COLS = 7;

const HomePageConnectGame = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null)),
  );
  const [player, setPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  // Dynamic fake stats
  const [playersToday, setPlayersToday] = useState(0);
  const [connectionsMade, setConnectionsMade] = useState(0);
  const [convosStarted, setConvosStarted] = useState(0);

  // Drop a disc in a column for a given player
  const dropDisc = (col, currentPlayer, currentBoard = board) => {
    const newBoard = [...currentBoard.map((row) => [...row])];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard); // Update the board state immediately
        return { newBoard, row };
      }
    }
    return null;
  };

  // Handle player move
  const handlePlayerMove = (col) => {
    if (winner || player !== "red") return;

    const result = dropDisc(col, "red");
    if (!result) return;

    const { newBoard, row } = result;
    setBoard(newBoard);
    if (checkWin(newBoard, row, col, "red")) {
      setWinner("You");
      return;
    }
    setPlayer("blue"); // CPU's turn
  };

  // CPU makes a random valid move
  useEffect(() => {
    if (player === "blue" && !winner) {
      const timeout = setTimeout(() => {
        const validCols = board[0]
          .map((_, col) => col)
          .filter((col) => board[0][col] === null);
        const randomCol =
          validCols[Math.floor(Math.random() * validCols.length)];
        const result = dropDisc(randomCol, "blue");
        if (!result) return;

        const { newBoard, row } = result;
        setBoard(newBoard);
        if (checkWin(newBoard, row, randomCol, "blue")) {
          setWinner("Computer");
        } else {
          setPlayer("red");
        }
      }, 700); // Small delay for realism
      return () => clearTimeout(timeout);
    }
  }, [player]);

  // Win checking
  const checkWin = (board, row, col, player) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    return directions.some(([dx, dy]) => {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const r = row + dx * i;
        const c = col + dy * i;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player)
          break;
        count++;
      }
      for (let i = 1; i < 4; i++) {
        const r = row - dx * i;
        const c = col - dy * i;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player)
          break;
        count++;
      }
      return count >= 4;
    });
  };

  // Use useEffect to animate stats increase
  useEffect(() => {
    // Fake stats
    const stats = [
      { state: playersToday, target: 38920, setter: setPlayersToday },
      { state: connectionsMade, target: 15437, setter: setConnectionsMade },
      { state: convosStarted, target: 8991, setter: setConvosStarted },
    ];

    const interval = setInterval(() => {
      stats.forEach(({ state, target, setter }) => {
        if (state < target) {
          setter(state + Math.floor(target * 0.01)); // Increase 1% per interval
        }
      });
    }, 10);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [playersToday, connectionsMade, convosStarted]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="scale-[0.9] origin-center w-full">
        <div className="relative h-full w-full flex flex-col items-center justify-start bg-base-200 pt-28 pb-20 px-6 overflow-hidden">
          
          {/* Full Screen Confetti on Win */}
          {winner && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
  
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">🎯 Connect & Win</h2>
            {!winner && (
              <p className="text-base-content mt-2">
                You:{" "}
                <span className="font-bold capitalize text-red-500 mr-6">Red</span>
                CPU:{" "}
                <span className="font-bold capitalize text-blue-500">Blue</span>
              </p>
            )}
          </div>
  
          {/* Game Board */}
          <div className="grid grid-cols-7 gap-2 mb-10">
            {Array(COLS)
              .fill(null)
              .map((_, col) => (
                <div
                  key={col}
                  className="cursor-pointer group flex flex-col-reverse gap-2"
                  onClick={() => handlePlayerMove(col)}
                >
                  {Array(ROWS)
                    .fill(null)
                    .map((_, row) => {
                      const cell = board[row][col];
                      return (
                        <div
                          key={row}
                          className={`w-12 h-12 rounded-full border border-base-content/10 bg-base-100 
                            group-hover:scale-105 group-hover:shadow-md flex items-center justify-center transition-all duration-300`}
                        >
                          {cell && (
                            <User
                              className={`w-6 h-6 ${cell === "red" ? "text-red-500" : "text-blue-500"}`}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
  
          {/* Fake Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl text-center text-base-content/80 text-sm mb-8">
            <div className="flex flex-col items-center">
              <Users className="w-5 h-5 mb-1 text-success" />
              <span className="font-semibold">{playersToday}</span>
              <span>players today</span>
            </div>
            <div className="flex flex-col items-center">
              <Handshake className="w-5 h-5 mb-1 text-primary" />
              <span className="font-semibold">{connectionsMade}</span>
              <span>connections made</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquareHeart className="w-5 h-5 mb-1 text-secondary" />
              <span className="font-semibold">{convosStarted}</span>
              <span>convos started</span>
            </div>
          </div>
  
          {/* Text Content */}
          <div className="absolute bottom-4 right-4 max-w-xs text-right z-10 text-sm leading-tight">
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
            <p className="text-base-content/60">{subtitle}</p>
          </div>
  
          {/* Winner Modal */}
          {winner && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="bg-base-100 p-8 rounded-lg shadow-xl text-center">
                <h3 className="text-xl font-bold mb-4 text-success">
                  {winner === "You" ? "🎉 You win!" : "🤖 CPU wins!"}
                </h3>
                <p className="text-base-content mb-4">
                  Sign up to challenge real people!
                </p>
                <button
                  onClick={() => navigate("/signup")}
                  className="btn btn-primary w-full"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default HomePageConnectGame;
