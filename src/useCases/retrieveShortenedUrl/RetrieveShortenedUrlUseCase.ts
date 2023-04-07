import { ShortenedURL } from '../../models/ShortenedURL';
import { ShortenedUrlCustomError } from '../../models/ShortenedUrlCustomError';
import { IShortenedURLRepository } from '../../repositories/interfaces/IShortenedURLRepository';

class RetrieveShortenedUrlUseCase {
	private shortenedURLRepository: IShortenedURLRepository;
	constructor(shortenedURLRepository: IShortenedURLRepository) {
		this.shortenedURLRepository = shortenedURLRepository;
	}

	async execute(alias: string): Promise<ShortenedURL> {
		const shortenedUrl = await this.shortenedURLRepository.findShortenedUrlByAlias(
			alias
		);
		if (!shortenedUrl) {
			throw new ShortenedUrlCustomError('SHORTENED URL NOT FOUND', '002', 404);
		}

		return shortenedUrl;
	}
}

export { RetrieveShortenedUrlUseCase };

