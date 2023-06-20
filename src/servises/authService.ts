import { User } from '../models/User';

export const createUser = async(email: string, password: string) => {
  const user = await User.create({ email, password });

  return user;
};

export const getUserByEmail = async(email: string) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

export const getUserById = async(userId: number) => {
  const user = await User.findOne({ where: { id: userId } });

  return user;
};

export const updateUser = async(userId: number, updateData: {
  email?: string;
  password?: string;
}) => {
  const user = await User.update(
    updateData,
    { where: { id: userId } },
  );

  return user;
};
