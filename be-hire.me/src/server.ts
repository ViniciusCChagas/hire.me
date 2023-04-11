import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { mainRouter } from './routes/main.routes';
import './services/YupTranslateService';

const app = express();

app.use(express.json());
app.use(
	cors({
		methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
		Headers: ['Content-Type', 'Authorization', 'Origin'],
		credentials: false,
	})
);

app.use(LoggerMiddleware);

app.use(mainRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
