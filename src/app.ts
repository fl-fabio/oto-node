import { config } from 'dotenv-flow';
config();

import express from 'express';
import cors from 'cors';
import { Logger } from './utils/logger';
import { dbConnection } from './config/dbConnection';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);
console.log(`Database Host: ${process.env.DB_PORT}`);
console.log(`Database User: ${process.env.DB_NAME}`);

app.use('/status', (_, res) => res.status(200).json({ message: '🚀 Server is running 🚀' }));

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