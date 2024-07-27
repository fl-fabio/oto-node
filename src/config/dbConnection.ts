import { Logger } from "../utils/logger";
import mongoose from "mongoose";

const isRunningOnAtlas = () => 
    process.env.NODE_ENV === 'production';

const dbUrl = isRunningOnAtlas()
  ? String(process.env.MONGO_DB_URI)
  : `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;

if (!process.env.DB_PORT || !process.env.DB_NAME) {
    Logger.error("Le variabili d'ambiente DB_PORT e DB_NAME devono essere definite.");
    process.exit(1);
}

export const dbConnection = () => {
    Logger.info(`Attempting to connect to ${dbUrl}`);
    mongoose.set('strictQuery', true);
    return mongoose.connect(dbUrl, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: process.env.NODE_ENV === 'production' ? 5 : 3,
    });
}