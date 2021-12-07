import { getAllTasksService, deleteTaskService } from '../tasks/task.service'
import { IBoard, IBoardWoId } from './models/board.model';
import { ITask } from '../tasks/models/task.model'
import {
    getAll,
    getBoardById,
    createNewBoard,
    updateBoard,
    removeBoard
} from './boards.memory.repository'

export const getAllService = async ():Promise<IBoard[]> => {
    const allBoards = await getAll();
    return allBoards;
} 
export const getByIdService = async (id:string):Promise<IBoard | undefined> => {
    const board = await getBoardById(id);
    return board;
}

export const createBoardService = async (obj: IBoardWoId):Promise<IBoard> => {
    const newBoard = await createNewBoard(obj);
    return newBoard;
}
export const updateBoardService = async(id:string, board: IBoardWoId):Promise<IBoard> => {
    const old:any = await getByIdService(id)
    const update = {
        title: board.title || old.title,
        columns: board.columns || old.columns,
    }
    const updBoard = await updateBoard(id, update)
    return updBoard;
}

export const deleteBoardService = async (id:string):Promise<void> => {
    const tasks: ITask[] = await getAllTasksService()
    tasks.forEach(task => {
        if(task.boardId === id) {
            deleteTaskService(id, task.id)
        }
    })
    await removeBoard(id);
}
