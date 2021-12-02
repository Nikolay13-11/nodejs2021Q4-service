const taskRepo = require('./task.memory.repository');

// eslint-disable-next-line no-return-await
const getAll = async (boardId) => await taskRepo.getAllOnBoardById(boardId);
// eslint-disable-next-line no-return-await
const getById = async (boardId, taskId) => await taskRepo.getTaskById(boardId, taskId);
// eslint-disable-next-line no-return-await
const createTask = async (obj) => await taskRepo.createNewTask(obj);
const updateTask = async(boardId, taskId, task) => {
    const old = await getById(boardId, taskId)
    const update = {
        title: task.title || old.title,
        order: task.order || old.order,
        description: task.description || old.description,
        userId: task.userId || old.userId,
        boardId: task.boardId || old.boardId,
        columnId: task.columnId || old.columnId
    }
    // eslint-disable-next-line no-return-await
    return await taskRepo.updateTask(boardId, taskId, update)
}

// eslint-disable-next-line no-return-await
const deleteTask = async (boardId, taskId) => await taskRepo.removeTask(boardId, taskId);

module.exports = { getAll, getById, createTask, deleteTask, updateTask };
