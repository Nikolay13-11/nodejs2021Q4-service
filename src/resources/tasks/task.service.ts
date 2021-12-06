import { ITask, ITaskWoId } from './models/task.model';
import {
    getAllTasks,
    getTask,
    getAllOnBoardById,
    getTaskById,
    createNewTask,
    updateTask,
    removeTask
} from './task.memory.repository'

export const getAllTasksService = async ():Promise<ITask[] | undefined> => {
    const allTsks = await getAllTasks();
    return allTsks
} 

export const getTaskService = async (id: string):Promise<ITask | undefined> => {
    const tasks = await getTask(id)
    return tasks
}

export const getAllService = async (boardId: string):Promise<ITask[] | undefined> => {
    const allTasks = await getAllOnBoardById(boardId);
    return allTasks
} 

export const getByIdService = async (boardId:string, taskId:string):Promise<ITask | undefined> => {
    const taskById =  await getTaskById(boardId, taskId);
    return taskById
}

export const createTaskService = async (obj: ITask):Promise<ITask> => {
    const newTask = await createNewTask(obj);
    return newTask;
}
export const updateTaskService = async( taskId: string, task: ITaskWoId):Promise<ITask> => {
    const old:any = await getTaskService(taskId)
    const update = {
        title: task.title || old.title,
        order: task.order || old.order,
        description: task.description || old.description,
        userId: task.userId,
        boardId: task.boardId || old.boardId,
        columnId: task.columnId || old.columnId
    }
    const updTask = await updateTask(taskId, update)
    return updTask
}

export const deleteTaskService = async (boardId:string, taskId:string):Promise<void> => {
    const delTask = await removeTask(boardId, taskId);
    return delTask;
} 

