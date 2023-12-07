import React from 'react'

function Square({value,onClick}) {
  
  //  - `value`: The current symbol displayed in the square (X, O, or empty)
  //  - `onClick`: A function to be called when the square is clicked

  return (
    <button className='square' onClick={onClick}>{value}</button>
  )
}

export default Square