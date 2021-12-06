import { IUser, IUserWoId } from "./models/user.model";
import { User } from "./user.model";

let users: IUser[] = []

export const getAll = ():IUser[] => users;

export const getUserById = (id: string):IUser | undefined => users.find(user => user.id === id)

export const createNewUser = (obj: IUser): IUser => {
  const newUser = new User(obj)
  users.push(newUser)
  return newUser
}

export const updateUser = (id: string, user: IUserWoId): IUser => {
  const index = users.findIndex(i => i.id === id)
  users[index] = {
    id,
    ...user
  }
  return users[index]
}

export const removeUser = (id: string): void => {
  users = users.filter(user => user.id !== id)
  };
