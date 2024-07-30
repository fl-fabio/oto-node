import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { validate } from "../middlewares/validate";
import { userValidationRules } from "../middlewares/validators/users.validator";

const usersRouter = Router();
const { getAll, getById, addUser, deleteById, patchById } = UsersController;

usersRouter.get('/', getAll);
usersRouter.get('/:id', getById);
usersRouter.post(('/'), userValidationRules, validate, addUser);
usersRouter.delete('/:id', deleteById);
usersRouter.patch('/:id', validate, patchById);

export default usersRouter;