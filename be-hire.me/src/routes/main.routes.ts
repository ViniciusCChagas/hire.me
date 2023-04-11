import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { createNewShortnedUrlController } from '../useCases/createNewShortenedUrl';
import { retrieveMostVisitedUrlsController } from '../useCases/retrieveMostVisitedsUrls';
import { retrieveShortenedUrlController } from '../useCases/retrieveShortenedUrl';

const mainRouter = Router();

mainRouter.get('/r/:alias', (request: Request, response: Response) => {
	return retrieveShortenedUrlController.handle(request, response);
});

mainRouter.get('/mostVisitedUrls', (request: Request, response: Response) => {
	return retrieveMostVisitedUrlsController.handle(request, response);
});

mainRouter.post('/create', (request: Request, response: Response) => {
	return createNewShortnedUrlController.handle(request, response);
});

export { mainRouter };

