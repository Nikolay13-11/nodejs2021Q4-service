import { IUser, IUserWoId } from "./models/user.model";
import { User } from "./user.model";

export const getAll = async (): Promise<IUser[]> => {
  const allUsers =  await User.find();
  return allUsers
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const user = await User.findOne(id)
  return user
}

export const createNewUser = async (obj: IUser): Promise<IUser> => {
  const newUser = new User(obj)
  User.getRepository().save(newUser)
  return newUser
}

export const updateUser = async (id: string, user: IUserWoId): Promise<User | Partial<User>>  => {
  let targetUser: Partial<User> | undefined= await getUserById(id)
  targetUser = {
    id, ...user
  }
  await User.getRepository().save(targetUser)
  return targetUser
}

export const removeUser = async (id: string): Promise<void> => {
  const user = await User.findOne(id)
  await user?.remove()
  };
