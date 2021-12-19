import { Board } from './boards.model'
import { IBoard, IBoardWoId } from './models/board.model'

let boards: IBoard[] = []

export const getAll = (): IBoard[] => boards;

export const getBoardById = (id: string): IBoard | undefined => boards.find(board => board.id === id)

export const createNewBoard = (obj: IBoardWoId): IBoard => {
  const newBoard = new Board(obj)
  boards.push(newBoard)
  return newBoard
}

export const updateBoard = (id: string, board: IBoardWoId) => {
  const index = boards.findIndex((i) => i.id === id)
  boards[index] = {
    id,
    ...board
  }
  return boards[index]
}

export const removeBoard = (id: string): void => {
  boards = boards.filter((board) => board.id !== id)
  };
