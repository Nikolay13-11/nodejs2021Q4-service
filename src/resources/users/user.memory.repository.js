const User = require('./user.model')

let users = []

const getAll = () => users;

const getUserById = (id) => users.find(user => user.id === id)

const createNewUser = (obj) => {
  const newUser = new User(obj)
  users.push(newUser)
  return newUser
}

const updateUser = (id, user) => {
  const index = users.findIndex(i => i.id === id)
  users[index] = {
    id,
    ...user
  }
  return users[index]
}

const removeUser = (id) => {
  users = users.filter(user => user.id !== id
  )};

module.exports = { getAll, getUserById, createNewUser, updateUser, removeUser };
