import { Router } from 'express';
import usersRouter from './routes/users-routes';

const indexV2 = Router();

indexV2.use('/users', usersRouter);
export default indexV2;