import { Router } from 'express';
import usersRouter from './routes/users-routes';

const indexV4 = Router();

indexV4.use('/users', usersRouter);
export default indexV4;