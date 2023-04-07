import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { createNewShortnedUrlController } from '../useCases/createNewShortenedUrl';
import { retrieveShortenedUrlController } from '../useCases/retrieveShortenedUrl';

const mainRouter = Router();

mainRouter.get('/r/:alias', (request: Request, response: Response) => {
	request.params.redirect = 'true';
	return retrieveShortenedUrlController.handle(request, response);
});

mainRouter.get('/:alias', (request: Request, response: Response) => {
	return retrieveShortenedUrlController.handle(request, response);
});

mainRouter.put('/create', (request: Request, response: Response) => {
	return createNewShortnedUrlController.handle(request, response);
});

export { mainRouter };

