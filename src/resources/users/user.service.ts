const { getAllTasks, updateTask } = require('../tasks/task.service')
import { IUser, IUserWoId } from "./models/user.model";
import { ITask } from "../tasks/models/task.model";
import {
  getAll,
  getUserById,
  createNewUser,
  updateUser,
  removeUser
} from "./user.memory.repository";


export const getAllService = async ():Promise<IUser[]> => {
  const allUsers = await getAll();
  return allUsers
}

export const getByIdService = async (id:string):Promise<IUser | undefined> => {
  const user = await getUserById(id);
  return user;
}

export const createUserService = async (obj: IUser) => {
  const newUser = await createNewUser(obj);
  return newUser;
}
export const updateUserService = async(id:string, user:IUserWoId):Promise<IUser> => {
    const old: any = await getByIdService(id)
    const update = {
        name: user.name || old.name,
        login: user.login || old.login,
        password: user.password || old.password,
    }
    const updUser = await updateUser(id, update)
    return updUser;
}

export const deleteUserService = async (id:string):Promise<void> => {
  const tasks = await getAllTasks()
  tasks.forEach((task: ITask) => {
    if(task.userId === id) {
      updateTask(task.id, {
        "userId": null
      })
    }
  })
  await removeUser(id);
}
