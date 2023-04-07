import { HiLoCounterRepository } from '../../repositories/HiLOCounterRepository';
import { ShortenedURLRepository } from '../../repositories/ShortenedURLRepository';
import { CreateNewShortnedUrlController } from './CreateNewShortenedUrlController';
import { CreateNewShortenedUrlUseCase } from './CreateNewShortenedUrlUseCase';

const shortenedURLRepository = new ShortenedURLRepository();
const hiLoCounterRepository = new HiLoCounterRepository();

const createNewShortenedUrlUseCase = new CreateNewShortenedUrlUseCase(
	shortenedURLRepository,
	hiLoCounterRepository
);

const createNewShortnedUrlController = new CreateNewShortnedUrlController(
	createNewShortenedUrlUseCase
);

export { createNewShortnedUrlController };

