const GameInfo = ({ status, winner, xIsNext, filledSquares }) => {
  return (
    <section>
      {xIsNext && !winner ? (
        <h3>It's your turn, player X</h3>
      ) : !xIsNext && !winner && filledSquares !== 10 ? (
        <h3>Now you, player O! </h3>
      ) : winner && status === 'Winner: X' ? (
        <h3>Nice! X won! </h3>
      ) : winner && status === 'Winner: O' ? (
        <h3>Wohoo! O made it!</h3>
      ) : !winner && filledSquares === 10 ? (
      <h3>Draw!</h3>
      ) : ""}
    </section>
  )
}

export default GameInfo
