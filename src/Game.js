import React , {useEffect, useState }from 'react'
import Board from './Board'

export default function Game() {

  const [players, setplayers] = useState({
    player : null,
    aiplayer : null
  });
  const [squares, setsquares] = useState(Array.from({ length: 3 }, () => Array(3).fill(null)));
  const [isNextMoveAi, setisNextMoveAi] = useState(false);
  const [gameStarted, setgameStarted] = useState(false);
  const [gameEnded, setgameEnded] = useState(false);
  const [message, setmessage] = useState();
  
  useEffect(() => {
    setmessage((prevMessage) => (isNextMoveAi ? players.aiplayer + ' chance' : players.player + ' chance'));
  }, [isNextMoveAi, players]);

  function choosePlayer(p){
      setplayers({
        player : p === "X" ? "X" : "O",  
        aiplayer : p === "X" ? "O" : "X"})

      setisNextMoveAi(p === "O")
      setgameStarted(true)
  }

  function restart(){
    window.location.reload()
  }

  return (
    <div className='game'>
        <h1>Tic Tac Toe</h1>
        <Board  
                squares={squares}
                setsquares={setsquares}
                players={players} isNextMoveAi = {isNextMoveAi} 
                setisNextMoveAi = {setisNextMoveAi} 
                setmessage={setmessage}
                gameStarted = {gameStarted}
                gameEnded = {gameEnded}
                setgameEnded = {setgameEnded}
        ></Board>
        {gameStarted && <p>{message}</p>}
        {
          !gameStarted && (
            <div className="container">
              <div className="column">
                <button className='mybuttons' onClick={(e)=>choosePlayer("X")}>Play X</button>
              </div>
              <div className="column">
                <button className='mybuttons' onClick={(e)=>choosePlayer("O")}>Play O</button>
              </div>
            </div>
          )
        }
        {gameEnded &&(
          <div className="container">
            <div className="column">
              <button className='mybuttons' onClick={(e)=>restart()}>Restart</button>
            </div>
          </div>
        )}
    </div>
  )
}
