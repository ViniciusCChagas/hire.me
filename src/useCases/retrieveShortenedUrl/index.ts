import { ShortenedURLRepository } from '../../repositories/ShortenedURLRepository';
import { RetrieveShortenedUrlController } from './RetrieveShortenedUrlController';
import { RetrieveShortenedUrlUseCase } from './RetrieveShortenedUrlUseCase';

const shortenedURLRepository = new ShortenedURLRepository();

const retrieveShortenedUrlUseCase = new RetrieveShortenedUrlUseCase(
	shortenedURLRepository
);

const retrieveShortenedUrlController = new RetrieveShortenedUrlController(
	retrieveShortenedUrlUseCase
);

export { retrieveShortenedUrlController };

