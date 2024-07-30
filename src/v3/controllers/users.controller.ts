import { Response, Request } from "express";
import UsersServices from "../services/users.service";

const {findAll, findById, add, deleteById, patchById} = UsersServices;

export default class UsersController {
    public static readonly getAll = async (req: Request, res: Response) => {
        try {
            const users = await findAll();
            res.status(200).json(users);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly getById = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            if (!id) {
                throw new Error('User ID is required');
            }
            const user = await findById(id);
            res.status(200).json(user);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly addUser = async (req: Request, res: Response) => {
        try {
            const userToAdd = req.body;
            if (!userToAdd) {
                throw new Error('User data is required');
            }
            const users = await add(userToAdd);
            res.status(200).json({ users });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    public static readonly deleteById = async (req: Request, res: Response) => {
        try {
           const id = +req.params.id;
           if (!id) {
               throw new Error('User ID is required');
           }
           const users = await deleteById(id);
           res.status(200).json({ users });

        } catch (err: any) {
            throw new Error(`Error deleting user: ${err.message}`);
        }
    }

    public static readonly patchById = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            const userToUpdate = req.body;
            if (!userToUpdate) {
                throw new Error('User data is required');
            }
            const users = await patchById(id, userToUpdate);
            res.status(200).json({ users });
        } catch (err: any) {
            throw new Error(`Error updating user: ${err.message}`);
        }
    }
}