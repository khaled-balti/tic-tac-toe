import React, { Fragment, useState } from 'react';
import calculateWinner from './helpers/calculateWinner';
import Board from './components/board/Board';
import GameInfo from './components/game-info/GameInfo';
import 'bootstrap/dist/css/bootstrap.css';
const App = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [showError, setShowError] = useState(false)
  const [mode, setMode] = useState(null)
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i) => {
      const currentHistory = history.slice(0, stepNumber + 1);
      const current = currentHistory[currentHistory.length - 1];
      const squares = current.squares.slice();
    if (mode === 'two') {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        setHistory(currentHistory.concat([{ squares: squares }]));
        setStepNumber(currentHistory.length)
        setXIsNext(!xIsNext);
    }
    if (mode === "auto" && !calculateWinner(squares)) {
        if (xIsNext) {
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = "X";
            setHistory(currentHistory.concat([{ squares: squares }]));
            setStepNumber(currentHistory.length)
        }
        if (calculateWinner(squares)) {
            return;
        }
        setTimeout(() => {
            const emptySquares = squares.reduce((acc, square, index) => {
                if (!square) {
                    acc.push(index);
                }
                return acc;
            }, []);
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            const randomSquare = emptySquares[randomIndex];
            squares[randomSquare] = 'O';
            setHistory(currentHistory.concat([{ squares: squares }]));
            setStepNumber(currentHistory.length);
        }, 500);
    }
    else {
        setShowError(true)
    }
  };
  
  

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');


  return (
    <div  className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='mb-5'>Tic Tac Toe</h1>
        {!mode && <div className='container d-flex justify-content-between align-items-center mb-4'>
            <button className='button' onClick={() => {setMode("auto"); setShowError(false)}}>Auto</button>
            {showError && <p className='text-danger fs-5 fw-semibold'>Choose mode first</p>}
            <button className='button' onClick={() =>{ setMode("two"); setShowError(false)}}>Two Players</button>
        </div>}
        <GameInfo
            status={status}
            winner={winner}
            xIsNext={xIsNext}
            filledSquares={history.length}
        />
        <section className='d-flex justify-content-center align-items-center mt-3'>
            <Board
                squares={current.squares}
                onClick={handleClick}
                jumpTo={jumpTo}
                setMode={setMode}
                setShowError={setShowError}
            />
        </section>
    </div>
  );
};

export default App;
