const Task = require('./task.model')
import { ITask, ITaskWoId } from './models/task.model'

let tasks: ITask[] = []

export const getAllTasks = (): ITask[] | undefined => tasks;

export const getTask = (taskId: string):ITask | undefined => {
  const allTasks = tasks.find(task => task.id === taskId);
  return allTasks;
}

export const getAllOnBoardById = (boardId: string) => tasks.filter(task => task.boardId === boardId);

export const getTaskById = (boardId: string, taskId: string): ITask | undefined => tasks.find(task => task.boardId === boardId && task.id === taskId)

export const createNewTask = (obj: ITask): ITask => {
  const newTask = new Task(obj)
  tasks.push(newTask)
  return newTask
}

export const updateTask = (id: string, task: ITaskWoId): ITask => {
  const index = tasks.findIndex(i => i.id === id)
  tasks[index] = { id, ...task }
  return tasks[index]
}

export const removeTask = (boardId: string, taskId: string): void => {
  tasks = tasks.filter(task => ((task.boardId !== boardId || task.boardId === boardId) && task.id !== taskId))
};
 