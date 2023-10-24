import { UserModel } from '../schemas/users';

interface UserAttributes {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken?: string;
  };
}

const getUsers = () => UserModel.find();
const getUserByEmail = (email: string) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });
const getUserById = (id: string) => UserModel.findById(id);
const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ _id: id });
const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export { getUsers, getUserByEmail, getUserBySessionToken, getUserById, createUser, deleteUserById, updateUserById };
