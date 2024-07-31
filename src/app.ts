import { config } from 'dotenv-flow';
config();

import express from 'express';
import cors from 'cors';
import { Logger } from './utils/logger';
import { dbConnection } from './config/dbConnection';
import users from "./data/users.json";
import indexV1 from "./v1";
import indexV2 from './v2';
import indexV3 from './v3';
import indexV4 from './v4';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);
console.log(`Database Host: ${process.env.DB_PORT}`);
console.log(`Database User: ${process.env.DB_NAME}`);

app.use('/status', (_, res) => res.status(200).json({ message: '🚀 Server is running 🚀' }));

app.use('/v1', indexV1);
app.use('/v2', indexV2);
app.use('/V3', indexV3);
app.use('/V4', indexV4);

/*** Esempio di uso routes e callback in express ***/


/**** *****/

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    Logger.info(`🚀 Server is listening on port ${PORT} 🚀 `);
    Logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
    Logger.info(`ENVIRONMENT=${process.env.ENVIRONMENT}`);
    try {
        await dbConnection();
        Logger.info('MongoDB connected');
    } catch (error) {
        Logger.error(error);
    }
    Logger.info('Waiting...');
})