import React, { useState } from 'react';
import Board from '../board/Board';

function Game() {
  const [squares, setSquare] = useState(Array(9).fill(null));

  return <Board squares={squares} />;
}

export default Game;
