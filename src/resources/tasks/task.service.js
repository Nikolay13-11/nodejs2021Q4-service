const taskRepo = require('./task.memory.repository');

const getAllTasks = async () => {
    const allTsks = await taskRepo.getAllTasks();
    return allTsks
} 

const getTask = async (id) => {
    const tasks = await taskRepo.getTask(id)
    return tasks
}

const getAll = async (boardId) => {
    const allTasks = await taskRepo.getAllOnBoardById(boardId);
    return allTasks
} 

const getById = async (boardId, taskId) => {
    const taskById =  await taskRepo.getTaskById(boardId, taskId);
    return taskById
}

const createTask = async (obj) => {
    const newTask = await taskRepo.createNewTask(obj);
    return newTask;
}
const updateTask = async( taskId, task) => {
    const old = await getTask(taskId)
    const update = {
        title: task.title || old.title,
        order: task.order || old.order,
        description: task.description || old.description,
        userId: task.userId,
        boardId: task.boardId || old.boardId,
        columnId: task.columnId || old.columnId
    }
    const updTask = await taskRepo.updateTask(taskId, update)
    return updTask
}

const deleteTask = async (boardId, taskId) => {
    const delTask = await taskRepo.removeTask(boardId, taskId);
    return delTask;
} 

module.exports = { getAll, getById, createTask, deleteTask, updateTask, getAllTasks, getTask };
