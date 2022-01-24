import { IUser, IUserWoId } from "./models/user.model";

import {
  getAll,
  getUserById,
  createNewUser,
  updateUser,
  removeUser
} from "./user.memory.repository";
import { User } from './user.model';
import { generateHash } from '../../common/middleware/auth';

export const getAllService = async ():Promise<IUser[]> => {
  const allUsers = await getAll();
  return allUsers
}

export const getByIdService = async (id:string):Promise<IUser | undefined> => {
  const user = await getUserById(id);

  return user;
}

export const createUserService = async (obj: User):Promise<IUser> => {
  const newUser = await createNewUser(obj);
  return newUser;
}
export const updateUserService = async(id:string, user:IUserWoId):Promise<Partial<User> | User> => {
    const old:IUserWoId | undefined = await getByIdService(id)
    if(old === undefined) {
      throw new Error(
        'not found'
      );
    }
    const update:IUserWoId = {
      name: user.name || old.name,
      login: user.login || old.login,
      password: await generateHash(user.password) || old.password
    }
    const updUser = await updateUser(id, update)
    return updUser;
}

export const deleteUserService = async (id:string):Promise<void> => {
  await removeUser(id);
}
