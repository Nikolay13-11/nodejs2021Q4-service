const boardsRepo = require('./boards.memory.repository');
const { getAllTasks, deleteTask } = require('../tasks/task.service')


const getAll = async () => {
    const allBoards = await boardsRepo.getAll();
    return allBoards;
} 
const getById = async (id) => {
    const board = await boardsRepo.getBoardById(id);
    return board;
}

const createBoard = async (obj) => {
    const newBoard = await boardsRepo.createNewBoard(obj);
    return newBoard;
}
const updateBoard = async(id, board) => {
    const old = await getById(id)
    const update = {
        title: board.title || old.title,
        columns: board.columns || old.columns,
    }
    const updBoard = await boardsRepo.updateBoard(id, update)
    return updBoard;
}

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