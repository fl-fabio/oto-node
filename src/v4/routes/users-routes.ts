import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { validate } from "../middlewares/validate";
import { userValidationRules } from "../middlewares/validators/users.validator";

const usersRouter = Router();
const { getUsers, getUser, addUser, deleteUserHandler, updateUserHandler } = UsersController;

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post(('/'), userValidationRules, validate, addUser);
usersRouter.delete('/:id', deleteUserHandler);
usersRouter.patch('/:id', validate, updateUserHandler);

export default usersRouter;