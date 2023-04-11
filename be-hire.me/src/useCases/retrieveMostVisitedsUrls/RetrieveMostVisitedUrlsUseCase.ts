import { ShortenedURL } from '../../models/ShortenedURL';
import { IShortenedURLRepository } from '../../repositories/interfaces/IShortenedURLRepository';

class RetrieveMostVisitedUrlsUseCase {
	private shortenedURLRepository: IShortenedURLRepository;
	constructor(shortenedURLRepository: IShortenedURLRepository) {
		this.shortenedURLRepository = shortenedURLRepository;
	}

	async execute(): Promise<ShortenedURL[]> {
		const mostVisitedUrls = await this.shortenedURLRepository.findMostsVisitedUrls();
		return mostVisitedUrls;
	}
}

export { RetrieveMostVisitedUrlsUseCase };

