import { IBoardWoId } from './models/board.model';
import {
    getAll,
    getBoardById,
    createNewBoard,
    updateBoard,
    removeBoard
} from './boards.memory.repository'
import { Board } from './boards.model';

export const getAllService = async ():Promise<Board[]> => {
    const allBoards = await getAll();
    return allBoards;
} 
export const getByIdService = async (id:string):Promise<Board | undefined> => {
    const board = await getBoardById(id);
    return board;
}

export const createBoardService = async (obj: Board):Promise<Board> => {
    const newBoard = await createNewBoard(obj);
    return newBoard;
}
export const updateBoardService = async(id:string, board: IBoardWoId):Promise<Partial<Board> | Board> => {
    const old:Board | undefined = await getByIdService(id)
    const update: IBoardWoId = {
        title: '',
        columns: []
    }
    if(old) {
        update.title = board.title || old.title;
        update.columns = board.columns || old.columns;
    }
    const updBoard = await updateBoard(id, update)
    return updBoard;
}

export const deleteBoardService = async (id:string):Promise<void> => {
    // const tasks: ITask[] = await getAllTasksService()
    // tasks.forEach(task => {
    //     if(task.boardId === id) {
    //         deleteTaskService(id, task.id)
    //     }
    // })
    await removeBoard(id);
}
