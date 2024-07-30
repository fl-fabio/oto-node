import { Router } from "express";
import UsersController from "../controllers/users.controller";

const usersRouter = Router();
const { getAll, getById, addUser, deleteById, patchById } = UsersController;

usersRouter.get('/', getAll);
usersRouter.get('/:id', getById);
usersRouter.post(('/'), addUser);
usersRouter.delete('/:id', deleteById);
usersRouter.patch('/:id', patchById);

export default usersRouter;