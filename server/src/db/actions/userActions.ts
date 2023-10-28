import { User } from '../schemas/users';

const getUsers = () => User.find();
const getUserByEmail = (email: string) => User.findOne({ email });
const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
const getUserById = (id: string) => User.findById(id);
const createUser = (values: Record<string, any>) => new User(values).save().then((user: any) => user.toObject());
const deleteUserById = (id: string) => User.findByIdAndDelete({ _id: id });
const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);

export { getUsers, getUserByEmail, getUserBySessionToken, getUserById, createUser, deleteUserById, updateUserById };
