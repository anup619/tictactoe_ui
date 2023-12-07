import React, { useEffect, useState } from 'react'; 
import Board from './Board'; 

export default function Game() {
  // Define initial state for players, squares, turn, game status, and message
  const [players, setPlayers] = useState({
    player: null, // Player symbol (X or O)
    aiplayer: null, // AI player symbol
  });
  const [squares, setSquares] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(null)) // Array of squares filled with null initially
  );
  const [isNextMoveAi, setIsNextMoveAi] = useState(false); // Boolean indicating AI's turn
  const [gameStarted, setGameStarted] = useState(false); // Boolean indicating if game is started
  const [gameEnded, setGameEnded] = useState(false); // Boolean indicating if game is ended
  const [message, setmessage] = useState(''); // Message displayed to the user

  // Update the message based on the player's turn and AI status
  useEffect(() => {
    setmessage(
      (prevMessage) =>
        isNextMoveAi ? 'ai thinking...' : `${players.player}'s chance`
    );
  }, [isNextMoveAi, players]);

  // Function to choose player X or O and set up the game
  function choosePlayer(p) {
    setPlayers({
      player: p === 'X' ? 'X' : 'O', // Set player symbol based on selection
      aiplayer: p === 'X' ? 'O' : 'X', // Set AI player symbol
    });
    setIsNextMoveAi(p === 'O'); // Set AI's turn if player chooses O
    setGameStarted(true); // Mark game as started
  }

  // Function to restart the game
  function restart() {
    window.location.reload(); // Reload the page to reset the game state
  }

  // Render the game interface
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      {/* Render the Board component with necessary props */}
      <Board
        squares={squares}
        setsquares={setSquares}
        players={players}
        isNextMoveAi={isNextMoveAi}
        setisNextMoveAi={setIsNextMoveAi}
        setmessage={setmessage}
        gameStarted={gameStarted}
        gameEnded={gameEnded}
        setgameEnded={setGameEnded}
      />
      {gameStarted && <p>{message}</p>}
      {/* Show player selection buttons only if game hasn't started */}
      {!gameStarted && (
        <div className="container">
          <div className="column">
            <button className="mybuttons" onClick={() => choosePlayer('X')}>
              Play X
            </button>
          </div>
          <div className="column">
            <button className="mybuttons" onClick={() => choosePlayer('O')}>
              Play O
            </button>
          </div>
        </div>
      )}
      {/* Show restart button only if game has ended */}
      {gameEnded && (
        <div className="container">
          <div className="column">
            <button className="mybuttons" onClick={restart}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
