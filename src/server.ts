import 'dotenv/config';
import express from 'express';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { mainRouter } from './routes/main.routes';
import './services/YupTranslateService';

const app = express();

app.use(express.json());
// app.use(
// 	cors({
// 		origin: process.env.FE_RADAR_STARTUPS_URL,
// 		methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
// 		Headers: ['Content-Type', 'Authorization', 'Origin'],
// 		credentials: true,
// 	})
// );

app.use(LoggerMiddleware);

app.use(mainRouter);

app.listen(process.env.PORT, () => {
	console.log(`Running App listening on port ${process.env.PORT}`);
});
