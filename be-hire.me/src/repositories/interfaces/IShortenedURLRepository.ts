import { ShortenedURL } from '../../models/ShortenedURL';

interface IShortenedURLRepository {
	findShortenedUrlByAlias(alias: string): Promise<ShortenedURL>;
	createNewShortenedUrl(newShortenedUrl: ShortenedURL): Promise<ShortenedURL>;
	incremetnShortenedUrlVisitsCountByAlias(alias: string): Promise<ShortenedURL>;
	findMostsVisitedUrls(): Promise<ShortenedURL[]>;
}

export { IShortenedURLRepository };

