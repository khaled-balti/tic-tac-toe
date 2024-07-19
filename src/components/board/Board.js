import Square from '../square/Square'

const Board = ({ squares, onClick, jumpTo, setMode, setShowError }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }
  return (
    <section className="container">
      <section className="board mb-5">
        <section className="col-4 d-flex flex-column w-100">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </section>
        <section className="col-4 d-flex flex-column w-100">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </section>
        <section className="col-4 d-flex flex-column w-100">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </section>
      </section>
      <button className="button" onClick={() => {jumpTo(0); setMode(null); setShowError(false)}}>
        Restart the game
      </button>
    </section>
  )
}

export default Board
