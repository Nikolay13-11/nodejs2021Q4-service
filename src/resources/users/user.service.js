const usersRepo = require('./user.memory.repository');

// eslint-disable-next-line no-return-await
const getAll = async () => await usersRepo.getAll();
// eslint-disable-next-line no-return-await
const getById = async (id) => await usersRepo.getUserById(id);
// eslint-disable-next-line no-return-await
const createUser = async (obj) => await usersRepo.createNewUser(obj);
const updateUser = async(id, user) => {
    const old = await getById(id)
    const update = {
        name: user.name || old.name,
        login: user.login || old.login,
        password: user.password || old.password,
    }
    // eslint-disable-next-line no-return-await
    return await usersRepo.updateUser(id, update)
}

// eslint-disable-next-line no-return-await
const deleteUser = async (id) => await usersRepo.removeUser(id);

module.exports = { getAll, getById, createUser, deleteUser, updateUser };
