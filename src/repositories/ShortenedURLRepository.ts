import { ShortenedURL } from '../models/ShortenedURL';
import { mongoDbClient } from '../services/MongoDbService';
import { IShortenedURLRepository } from './interfaces/IShortenedURLRepository';

class ShortenedURLRepository implements IShortenedURLRepository {
	async findShortenedUrlByAlias(alias: string): Promise<ShortenedURL> {
		const db = mongoDbClient.db(process.env.MONGODB_DATABASE_NAME);
		const collection = db.collection(process.env.SHORTENED_URL_COLLECTION_NAME);

		const result = await collection.findOne({ alias });

		if (!result) {
			return null;
		}

		const shortenedUrl = new ShortenedURL({
			_id: result._id.toHexString(),
			alias: result.alias,
			url: result.url,
			createdAt: result.createdAt,
		});

		return shortenedUrl;
	}
	async createNewShortenedUrl({
		alias,
		url,
		createdAt,
	}: ShortenedURL): Promise<ShortenedURL> {
		const db = mongoDbClient.db(process.env.MONGODB_DATABASE_NAME);
		const collection = db.collection(process.env.SHORTENED_URL_COLLECTION_NAME);

		const result = await collection.insertOne({ alias, url, createdAt });

		return new ShortenedURL({
			_id: result.insertedId.toHexString(),
			alias,
			url,
			createdAt,
		});
	}
}

export { ShortenedURLRepository };

