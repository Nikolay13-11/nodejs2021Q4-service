import { ITask, ITaskWoId } from './models/task.model';
import {
    getTask,
    getAllOnBoardById,
    getTaskById,
    createNewTask,
    updateTask,
    removeTask,
    getAllTasks
} from './task.memory.repository'
import { Task } from './task.model';

export const getAllTasksService = async ():Promise<ITask[] | []> => {
    const allTsks = await getAllTasks();
    return allTsks
} 

export const getTaskService = async (id: string):Promise<ITask | undefined> => {
    const tasks = await getTask(id)
    return tasks
}

export const getAllService = async (boardId: string):Promise<Task[] | undefined> => {
    const allTasks = await getAllOnBoardById(boardId);
    return allTasks
} 

export const getByIdService = async (boardId:string, taskId:string):Promise<ITask | undefined> => {
    const taskById =  await getTaskById(boardId, taskId);
    return taskById
}

export const createTaskService = async (obj: ITaskWoId):Promise<ITask> => {
    const newTask = await createNewTask(obj);
    return newTask;
}
export const updateTaskService = async ( taskId: string, task:ITaskWoId):Promise<Partial<Task> | Task> => {
    const old: ITask | undefined = await getTaskService(taskId)
    if( old === undefined) throw new Error("Task not found");
    const update:ITaskWoId = {
        title: task.title || old.title,
        order: task.order || old.order,
        description: task.description || old.description,
        userId: task.userId || old.userId,
        boardId: task.boardId || old.boardId,
        columnId: task.columnId || old.columnId,
    }
    const updTask = await updateTask(taskId, update)
    return updTask
}

export const deleteTaskService = async (boardId:string, taskId:string):Promise<void> => {
    await removeTask(boardId, taskId);
} 

