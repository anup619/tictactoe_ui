import React, { useEffect, useCallback, useMemo, useContext } from 'react';
import Square from './Square';
import ConfigContext from './ConfigContext';

function Board({
  // Board properties
  squares,
  setsquares,
  players,
  isNextMoveAi,
  setisNextMoveAi,
  setmessage,
  gameStarted,
  gameEnded,
  setgameEnded,
}) {
  // Cache for optimal moves to improve performance
  const optimalMovesCache = useMemo(() => new Map(), []);
  
  // Get the api url from config file
  const {apiUrl} = useContext(ConfigContext)
  
  // Debounced function to prevent excessive API calls
  const debouncedHandleClick = useCallback(
    (row, col) => {
      // Check if game is started, not ended, and not AI's turn
      if (gameStarted && !gameEnded && !isNextMoveAi) {
        // Check if square is empty
        if (!squares[row][col]) {
          // Update squares with player's symbol and set AI's turn
          setsquares((prevSquares) => {
            const copyOfSquares = [...prevSquares];
            copyOfSquares[row][col] = players.player;
            return copyOfSquares;
          });
          setisNextMoveAi(true);
        }
      }
    },
    [gameStarted, gameEnded, isNextMoveAi, players, setsquares, squares, setisNextMoveAi]
    );
    
    // Function to update board with AI's move
    const makeMove = useCallback(
      async (data) => {
        if (data.optimal_move) {
          setsquares((prevSquares) => {
            const copyOfSquares = [...prevSquares];
            const [i, j] = data.optimal_move;
            copyOfSquares[i][j] = data.next_player;
            return copyOfSquares;
          });
          setisNextMoveAi(false); // Set back to player's turn
        }
      },
      [setsquares, setisNextMoveAi]
      );
      
      // Function to fetch optimal move from backend API
      const fetchData = useCallback(
        async (board) => {
          try {
        // Check cache for previously calculated move
        const cachedMove = optimalMovesCache.get(JSON.stringify(board));
        if (cachedMove) {
          return cachedMove;
        }

        const response = await fetch(`${apiUrl}/optimalmove`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ board }), // Send board state to API
        });
        const data = await response.json();

        // Cache the retrieved data
        optimalMovesCache.set(JSON.stringify(board), data);
        return data;
      } catch (error) {
        console.error('Error fetching optimal move:', error);
        return undefined;
      }
    },
    [optimalMovesCache,apiUrl]
  );


  // Check for game end after each player move
  useEffect(() => {
    const fetchDataAndisGameEnded = async () => {
      const result = await fetchData(squares); // Get optimal move

      if (result) {
        if (result.winner_player) {
          setmessage(result.winner_player + ' Wins');
          setgameEnded(true); // Game ends with winner
        } else if (result.message) {
          setmessage(result.message); // Game ends with draw or other message
          setgameEnded(true);
        }
      }
    };

    fetchDataAndisGameEnded();
  }, [squares, setmessage, setgameEnded, fetchData]);

  // Make AI move on its turn
  useEffect(() => {
    if (isNextMoveAi && !gameEnded) {
      const fetchDataAndMakeMove = async () => {
        const result = await fetchData(squares); // Get optimal move
        if (result) {
          makeMove(result); // Update board with AI's move
        }
      };

      fetchDataAndMakeMove();
    }
  }, [isNextMoveAi, gameEnded, squares, fetchData, makeMove]);


  return (
    <div className='board'>
      <div className='board-row'>
        <Square value = {squares[0][0]} onClick = {(e)=>debouncedHandleClick(0,0)}></Square>
        <Square value = {squares[0][1]} onClick = {(e)=>debouncedHandleClick(0,1)}></Square>
        <Square value = {squares[0][2]} onClick = {(e)=>debouncedHandleClick(0,2)}></Square>
      </div>
      <div className='board-row'>
        <Square value = {squares[1][0]} onClick = {(e)=>debouncedHandleClick(1,0)}></Square>
        <Square value = {squares[1][1]} onClick = {(e)=>debouncedHandleClick(1,1)}></Square>
        <Square value = {squares[1][2]} onClick = {(e)=>debouncedHandleClick(1,2)}></Square>        
      </div>
      <div className='board-row'>
        <Square value = {squares[2][0]} onClick = {(e)=>debouncedHandleClick(2,0)}></Square>
        <Square value = {squares[2][1]} onClick = {(e)=>debouncedHandleClick(2,1)}></Square>
        <Square value = {squares[2][2]} onClick = {(e)=>debouncedHandleClick(2,2)}></Square>
      </div>
    </div>
  )
}


export default Board