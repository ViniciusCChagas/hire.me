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
			visitCount: result.visitCount,
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

		const result = await collection.insertOne({
			alias,
			url,
			createdAt,
			visitCount: 0,
		});

		return new ShortenedURL({
			_id: result.insertedId.toHexString(),
			alias,
			url,
			createdAt,
			visitCount: 0,
		});
	}

	async incremetnShortenedUrlVisitsCountByAlias(alias: string): Promise<ShortenedURL> {
		const databaseName = process.env.MONGODB_DATABASE_NAME;
		const collectionName = process.env.SHORTENED_URL_COLLECTION_NAME;

		const db = mongoDbClient.db(databaseName);
		const collection = db.collection(collectionName);

		const result = await collection.findOneAndUpdate(
			{ alias: alias },
			{ $inc: { visitCount: 1 } },
			{ returnDocument: 'after' }
		);

		const shortenedUrl = new ShortenedURL({
			alias,
			url: result.value.url,
			createdAt: result.value.createdAt,
			visitCount: result.value.visitCount,
		});

		return shortenedUrl;
	}

	async findMostsVisitedUrls(): Promise<ShortenedURL[]> {
		const databaseName = process.env.MONGODB_DATABASE_NAME;
		const collectionName = process.env.SHORTENED_URL_COLLECTION_NAME;

		const db = mongoDbClient.db(databaseName);
		const collection = db.collection(collectionName);

		const result = await collection
			.find()
			.sort({ visitCount: -1 })
			.limit(10)
			.toArray();

		const shortenedUrls: ShortenedURL[] = result.map((shortenedUrl) => {
			return new ShortenedURL({
				_id: shortenedUrl._id.toHexString(),
				alias: shortenedUrl.alias,
				url: shortenedUrl.url,
				createdAt: shortenedUrl.createdAt,
				visitCount: shortenedUrl.visitCount,
			});
		});

		return shortenedUrls;
	}
}

export { ShortenedURLRepository };

