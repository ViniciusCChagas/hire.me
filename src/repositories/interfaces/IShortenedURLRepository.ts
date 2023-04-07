import { ShortenedURL } from '../../models/ShortenedURL';

interface IShortenedURLRepository {
	findShortenedUrlByAlias(alias: string): Promise<ShortenedURL>;
	createNewShortenedUrl(newShortenedUrl: ShortenedURL): Promise<ShortenedURL>;
}

export { IShortenedURLRepository };

