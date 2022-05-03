import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router';

dotenv.config();

const PORT = process.env.DB_PORT;

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export const server = app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} 🚀`));
