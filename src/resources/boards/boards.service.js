const boardsRepo = require('./boards.memory.repository');

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
        colums: board.colums || old.colums,
    }
    // eslint-disable-next-line no-return-await
    return await boardsRepo.updateBoard(id, update)
}

// eslint-disable-next-line no-return-await
const deleteBoard = async (id) => await boardsRepo.removeBoard(id);

module.exports = { getAll, getById, createBoard, deleteBoard, updateBoard };
