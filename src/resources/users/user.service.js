const usersRepo = require('./user.memory.repository');
const { getAllTasks } = require('../tasks/task.service')
const { tasks } = require('../tasks/task.memory.repository')

const getAll = async () => {
  const allUsers = await usersRepo.getAll();
  return allUsers
}

const getById = async (id) => {
  const user = await usersRepo.getUserById(id);
  return user;
}

const createUser = async (obj) => {
  const newUser = await usersRepo.createNewUser(obj);
  return newUser;
}
const updateUser = async(id, user) => {
    const old = await getById(id)
    const update = {
        name: user.name || old.name,
        login: user.login || old.login,
        password: user.password || old.password,
    }
    const updUser = await usersRepo.updateUser(id, update)
    return updUser;
}

const deleteUser = async (id) => {
    const allTasks = await getAllTasks()
    allTasks.forEach((task, index) => {
    if(task.userId === id) {
      tasks[index].userId = null
    }
  })
  await usersRepo.removeUser(id);
}

module.exports = { getAll, getById, createUser, deleteUser, updateUser };
