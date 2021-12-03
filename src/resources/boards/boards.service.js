const boardsRepo = require('./boards.memory.repository');
const { getAllTasks, deleteTask } = require('../tasks/task.service')

// eslint-disable-next-line no-return-await
const getAll = async () => await boardsRepo.getAll();
// eslint-disable-next-line no-return-await
const getById = async (id) => await boardsRepo.getBoardById(id);
// eslint-disable-next-line no-return-await
const createBoard = async (obj) => await boardsRepo.createNewBoard(obj);
const updateBoard = async(id, board) => {
    const old = await getById(id)
    const update = {
        title: board.title || old.title,
        columns: board.columns || old.columns,
    }
    // eslint-disable-next-line no-return-await
    return await boardsRepo.updateBoard(id, update)
}

// eslint-disable-next-line no-return-await
const deleteBoard = async (id) => {
    const tasks = await getAllTasks()
    tasks.forEach(task => {
        if(task.boardId === id) {
            deleteTask(id, task.id)
        }
    })
    await boardsRepo.removeBoard(id);
}

module.exports = { getAll, getById, createBoard, deleteBoard, updateBoard };
