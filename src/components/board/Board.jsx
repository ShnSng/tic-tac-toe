import React from 'react';
import PropTypes from 'prop-types';
import Square from '../square/Square';

function Board({ squares }) {
  const board = [];
  let counter = 0;
  for (let i = 0; i < Math.sqrt(squares.length); i += 1) {
    const row = [];
    for (let j = 0; j < Math.sqrt(squares.length); j += 1) {
      row.push(<Square value={squares[counter]} onClick={() => {}} />);
      counter += 1;
    }
    board.push(<div className="row">{row}</div>);
  }

  return (
    <div>
      {board}
    </div>
  );
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Board;
