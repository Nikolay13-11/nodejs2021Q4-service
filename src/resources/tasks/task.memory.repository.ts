import { ITask, ITaskWoId, ITest } from './models/task.model'

import { Task } from './task.model'

export const getAllTasks = async (): Promise<ITask[] | []> => {
  const allTasks = await Task.find()
  return allTasks
};

export const getTask = async (taskId: string): Promise<Task | undefined> => {
  const task = await Task.findOne(taskId)
  return task;
}

export const getAllOnBoardById = async (boardId: string): Promise<Task[] | undefined> => {
  const tasksOnBoard = await Task.find({where: {boardId}})
  return tasksOnBoard
}

export const getTaskById = async (boardId: string, taskId: string): Promise<ITask | undefined> => {
  const task = await getTask(taskId || boardId)
  return task
}

export const createNewTask = async (obj: ITest): Promise<ITask> => {
  // const newTask = new Task(obj)
  const newTask = await Task.getRepository().create({...obj})
  await Task.getRepository().save(newTask)
  return newTask
}

export const updateTask = async (id: string, task: ITaskWoId): Promise<Task | Partial<Task>> => {
  let targetTask: Partial<Task> | undefined = await Task.findOne(id)
  targetTask = {
    id, ...task
  }
  await Task.getRepository().save(targetTask)
  return targetTask
}

export const removeTask = async (boardId: string, taskId: string): Promise<void> => {
  const task = await Task.findOne(taskId || boardId)
  await task?.remove()
};
 