import dotenv from 'dotenv';
import program from '../process.js';

const environment = program.opts().mode;

dotenv.config({
    path: `./.env.${environment}`
});

export default {
    MONGO_URL: process.env.MONGO_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    PORT: +process.env.PORT,
}