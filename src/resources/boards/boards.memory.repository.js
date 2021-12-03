const Board = require('./boards.model')

let boards = []

const getAll = () => boards;

const getBoardById = (id) => boards.find(board => board.id === id)

const createNewBoard = (obj) => {
  const newBoard = new Board(obj)
  boards.push(newBoard)
  return newBoard
}

const updateBoard = (id, board) => {
  const index = boards.findIndex((i) => i.id === id)
  boards[index] = {
    id,
    ...board
  }
  return boards[index]
}

const removeBoard = (id) => {
  boards = boards.filter((board) => board.id !== id)
  };

module.exports = { getAll, getBoardById, createNewBoard, updateBoard, removeBoard };
