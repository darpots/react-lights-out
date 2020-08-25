import React from 'react'
import { Cell } from './Cell'
import './Board.css'

const Board = (props) => {
  // PROPS
  const { nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 } = props
  // STATE
  const [hasWon, setHasWon] = React.useState(false)

  
  // RECREATE BOARD
  const createBoard = () => {
    let board = []
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }
  const [board, setBoard] = React.useState(createBoard())
  

  // FLIP CELLS ON CLICK
  const flipCellsAround = (coord) => {
    let [y, x] = coord.split('-').map(Number)
    let newBoard = [...board]
    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x]
      }
    }
    flipCell(y, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)
    flipCell(y - 1, x)
    flipCell(y + 1, x)

    const hasWon = newBoard.every((row) => row.every((cell) => !cell))
    setBoard(newBoard)
    setHasWon(hasWon)
  }

  // CREATE INITIAL BOARD
  const makeTable = () => {
    let tblBoard = []
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        )
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    )
  }

  const text1 = hasWon ? `YOU` : `Lights`
  const text2 = hasWon ? `WON!` : `Out`

  return (
    <div>
      <div className="Board-title">
        <div className="neon-orange">{text1}</div>
        <div className="neon-blue">{text2}</div>
      </div>
      {hasWon ? null : makeTable()}
    </div>
  )
}

export default Board
