import * as bcrypt from 'bcryptjs';

export const generateHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
