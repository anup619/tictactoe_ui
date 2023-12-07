import React, {useState,useEffect, useCallback } from 'react'
import Square from './Square'

function Board({squares, setsquares, players, isNextMoveAi, setisNextMoveAi, setmessage, gameStarted, gameEnded, setgameEnded}) {

  const [requestBody, setRequestBody] = useState({ board: squares });
  const [isUpdatingSquares, setIsUpdatingSquares] = useState(false);

  const fetchData = useCallback(async ()=>{
      try{
        const response = await fetch('http://127.0.0.1:5000/optimalmove',{
          method : 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
          const data = await response.json()
          return {data}
        }catch (error){
          return {error}
        }
    },[requestBody])
  
    
  const makeMove = useCallback((data)=>{
    if(data.optimal_move){
      setsquares(prevSquares => {
        const copyOfSquares = [...prevSquares];
        const [i, j] = data.optimal_move;
        copyOfSquares[i][j] = data.next_player;
        return copyOfSquares;
      });
      setisNextMoveAi(false)
    }
  },[setsquares,setisNextMoveAi])

  useEffect(() => {
    setRequestBody(prevRequestBody => ({ board: prevRequestBody.board }));
  }, [squares]);

  useEffect(() => {
    const fetchDataAndisGameEnded = async () =>{
      const result = await fetchData()
      if (result.data){
        const winner = result.data.winner_player
        const message = result.data.message
        if(winner){
          setmessage(winner + " Wins")
          setIsUpdatingSquares(true)
          setgameEnded(true)
        }
        else if(message){
          debugger
          setmessage(message)
          setIsUpdatingSquares(true)
          setgameEnded(true)
        }
      }
      else if (result.error) {
        console.error('Error', result.error);
      }
    }
    fetchDataAndisGameEnded()
  }, [squares,setmessage,fetchData,setgameEnded]);

  useEffect(() => {
    const fetchDataAndMakeMove = async () => {
      if (isNextMoveAi) {
        setIsUpdatingSquares(true);
        const result = await fetchData(); // Wait for the fetchData promise to resolve
        if (result.data) {
          console.log(result.data);
          debugger
          if(!gameEnded){
            makeMove(result.data);
          }
        } else if (result.error) {
          console.error('Error', result.error);
        }
        setIsUpdatingSquares(false);
      }
    };
  
    fetchDataAndMakeMove();
  }, [isNextMoveAi,fetchData,makeMove,gameEnded]);


  function handelClick(row,col){
    if (gameStarted && !gameEnded &&!isUpdatingSquares && !isNextMoveAi) {
      if (!squares[row][col]) {
        setsquares(prevSquares => {
          const copyOfSquares = [...prevSquares];
          copyOfSquares[row][col] = players.player;
          return copyOfSquares;
        });
        setisNextMoveAi(true);
      }
    }
  }

  

  return (
    <div className='board'>
      <div className='board-row'>
        <Square value = {squares[0][0]} onClick = {(e)=>handelClick(0,0)}></Square>
        <Square value = {squares[0][1]} onClick = {(e)=>handelClick(0,1)}></Square>
        <Square value = {squares[0][2]} onClick = {(e)=>handelClick(0,2)}></Square>
      </div>
      <div className='board-row'>
        <Square value = {squares[1][0]} onClick = {(e)=>handelClick(1,0)}></Square>
        <Square value = {squares[1][1]} onClick = {(e)=>handelClick(1,1)}></Square>
        <Square value = {squares[1][2]} onClick = {(e)=>handelClick(1,2)}></Square>        
      </div>
      <div className='board-row'>
        <Square value = {squares[2][0]} onClick = {(e)=>handelClick(2,0)}></Square>
        <Square value = {squares[2][1]} onClick = {(e)=>handelClick(2,1)}></Square>
        <Square value = {squares[2][2]} onClick = {(e)=>handelClick(2,2)}></Square>
      </div>
    </div>
  )
}


export default Board