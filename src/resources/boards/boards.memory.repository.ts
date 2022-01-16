import { Board } from './boards.model'
import { IBoardWoId } from './models/board.model'

export const getAll = async (): Promise<Board[]> => {
  const allBoards = await Board.find()
  return allBoards
}

export const getBoardById = async (id: string): Promise<Board | undefined> => {
  const board = await Board.findOne(id)
  return board
}

export const createNewBoard = async (obj: any): Promise<Board> => {
  const newBoard = new Board(obj)
  Board.getRepository().save(newBoard)
  return newBoard
}

export const updateBoard = async (id: string, board: IBoardWoId): Promise<Board | Partial<Board>> => {
  let targetBoard: Partial<Board> | undefined = await getBoardById(id)
  targetBoard = {
    id, ...board
  }
  Board.getRepository().save(targetBoard)
  return targetBoard
}

export const removeBoard = async (id: string): Promise<void> => {
  const board = await Board.findOne(id)
  await board?.remove()
  };
