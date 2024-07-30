import { Router } from 'express';
import usersRouter from './routes/users-routes';

const indexV3 = Router();

indexV3.use('/users', usersRouter);
export default indexV3;