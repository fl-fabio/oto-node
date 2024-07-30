import { Router } from 'express';
import usersRouter from './routes/users-routes';

const indexV1 = Router();

indexV1.use('/users', usersRouter);
export default indexV1;