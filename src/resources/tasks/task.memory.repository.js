const Task = require('./task.model')

let tasks = []

const getAllTasks = () => tasks;

const getTask = (taskId) => {
  console.log(tasks)
  return tasks.find(task => task.id === taskId);
}

const getAllOnBoardById = (boardId) => tasks.filter(task => task.boardId === boardId);

const getTaskById = (boardId, taskId) => tasks.find(task => task.boardId === boardId && task.id === taskId)

const createNewTask = (obj) => {
  
  const newTask = new Task(obj)
  tasks.push(newTask)
  return newTask
}

const updateTask = (id, task) => {
  const index = tasks.findIndex(i => i.id === id)
  tasks[index] = { id, ...task }
  return tasks[index]
}

const removeTask = (boardId, taskId) => {
  tasks = tasks.filter(task => ((task.boardId !== boardId || task.boardId === boardId) && task.id !== taskId))
};
 
module.exports = { getAllOnBoardById, getTaskById, createNewTask, updateTask, removeTask, tasks, getAllTasks, getTask };
