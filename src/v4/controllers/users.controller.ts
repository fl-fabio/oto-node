import { Response, Request } from "express";
import UsersServices from "../services/users.service";

const {findAll, findById, createUser, deleteUser, updateUser} = UsersServices;

export default class UsersController {
    public static readonly getUsers = async (req: Request, res: Response) => {
        try {
            const usersQueryParams = req.query;
            const {total, results} = await findAll(usersQueryParams as {[key: string]: string | number});
            res.status(200).json({ total, results });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await findById(id);
            if (user) res.status(200).json({total: 1, results: user});
            else res.status(404).json({ message: 'User not found' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly addUser = async (req: Request, res: Response) => {
        try {
            const user = await createUser(req.body);
            res.status(201).json({ data: user });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly deleteUserHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedUser = await deleteUser(id);
            if (deletedUser) res.status(200).json({ data: deletedUser });
            else res.status(404).json({ message: 'User not found' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly updateUserHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updatedUser = await updateUser(id, req.body);
            if (updatedUser) res.status(200).json({ data: updatedUser });
            else res.status(404).json({ message: 'User not found' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}