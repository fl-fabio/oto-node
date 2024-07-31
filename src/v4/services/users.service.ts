import users from '../../data/users.json';
import { PaginatedResponse, QueryParamsFilter } from '../../utils/query-response';
import { User, UserModel } from '../models/user.model';

export default class UsersServices {
    public static findAll = 
        async(query: {[key: string]: string | number}): Promise<PaginatedResponse<User>> => {
            const users = await UserModel.find();
            return QueryParamsFilter(users, ["name", "email"], query);
        }

    public static findById = async(id: string): Promise<User> => {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public static createUser = async(body: User): Promise<User> => {
        const { email } = body;
        const userAlreadyExists = await UserModel.findOne({ email });
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
        const newUser = await UserModel.create(body);
        if (!newUser) {
            throw new Error('Error creating user');
        }
        return newUser;
    }

    public static deleteUser = async(id: string): Promise<User> => {
        const userToDelete = await UserModel.findByIdAndDelete(id);
        if (!userToDelete) {
            throw new Error('User not found');
        }
        return userToDelete;
    }

    public static updateUser = 
        async(id: string, body: Partial<User>): Promise<User> => {
            const userToUpdate = await UserModel.findByIdAndUpdate(id, body, { new: true });
            if (!userToUpdate) {
                throw new Error('User not found');
            }
            return userToUpdate;
        }
}