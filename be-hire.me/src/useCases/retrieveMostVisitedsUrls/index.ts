import { ShortenedURLRepository } from '../../repositories/ShortenedURLRepository';
import { RetrieveMostVisitedUrlsUseCase } from './RetrieveMostVisitedUrlsUseCase';
import { RetrieveShortenedUrlController } from './RetrieveMostVisitedsUrlsController';

const shortenedURLRepository = new ShortenedURLRepository();

const retrieveMostVisitedUrlsUseCase = new RetrieveMostVisitedUrlsUseCase(
	shortenedURLRepository
);

const retrieveMostVisitedUrlsController = new RetrieveShortenedUrlController(
	retrieveMostVisitedUrlsUseCase
);

export { retrieveMostVisitedUrlsController };

