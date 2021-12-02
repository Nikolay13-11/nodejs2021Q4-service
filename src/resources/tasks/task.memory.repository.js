const Task = require('./task.model')

let tasks = [
//   {
//   "id": "333", 
//   "title": "abc",
//   "order": "3",
//   "description": "first",
//   "userId": "123",
//   "boardId": "1",
//   "columnId": "1"
// },
//   {
//     "id": "555", 
//   "title": "abc",
//   "order": "3",
//   "description": "first",
//   "userId": "123",
//   "boardId": "2",
//   "columnId": "1"
// },
//   {
//     "id": "777",
//   "title": "abc",
//   "order": "3",
//   "description": "first",
//   "userId": "123",
//   "boardId": "3",
//   "columnId": "1"
// },
//   {
//   "title": "abc",
//   "order": "3",
//   "description": "first",
//   "userId": "123",
//   "boardId": "1",
//   "columnId": "1"
// }
]

const getAllOnBoardById = (boardId) => tasks.filter(task => task.boardId === boardId);

const getTaskById = (boardId, taskId) => tasks.find(task => task.boardId === boardId && task.id === taskId)

const createNewTask = (obj) => {
  
  const newTask = new Task(obj)
  tasks.push(newTask)
  return newTask
}

const updateTask = (boardId, taskId, task) => {
  const index = tasks.findIndex(i => i.boardId === boardId && i.id === taskId)
  tasks[index] = {
    taskId,
    boardId,
    ...task
  }
  return tasks[index]
}

const removeTask = (boardId, taskId) => {
  tasks = tasks.filter(task => ((task.boardId !== boardId || task.boardId === boardId) && task.id !== taskId))
};
 
module.exports = { getAllOnBoardById, getTaskById, createNewTask, updateTask, removeTask };
