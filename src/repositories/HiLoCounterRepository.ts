import { ObjectId } from 'mongodb';
import { HiLoCounter } from '../models/HiLoCounter';
import { mongoDbClient } from '../services/MongoDbService';
import { IHiLoCounterRepository } from './interfaces/IHiLoCounterRepository';

class HiLoCounterRepository implements IHiLoCounterRepository {
	async findHiLoCounter(): Promise<HiLoCounter> {
		const databaseName = process.env.MONGODB_DATABASE_NAME;
		const collectionName = process.env.HILO_COLECTION_NAME;

		const db = mongoDbClient.db(databaseName);
		const collection = db.collection(collectionName);

		const result = await collection.findOne();

		if (!result) {
			return null;
		}

		const hiLoCounter = new HiLoCounter({
			_id: result._id,
			hi: result.hi,
			lo: result.lo,
			maxLoValue: result.maxLoValue,
		});

		return hiLoCounter;
	}
	async initHiLoCounter(): Promise<HiLoCounter> {
		const databaseName = process.env.MONGODB_DATABASE_NAME;
		const collectionName = process.env.HILO_COLECTION_NAME;

		const db = mongoDbClient.db(databaseName);
		const collection = db.collection(collectionName);

		const result = await collection.insertOne({ hi: 0, lo: 1, maxLoValue: 99999 });

		const hiLoCounter = new HiLoCounter({
			_id: result.insertedId,
			hi: 0,
			lo: 1,
			maxLoValue: 99999,
		});

		return hiLoCounter;
	}
	async findAndIncrementLoCounterByKey(key: string): Promise<HiLoCounter> {
		const databaseName = process.env.MONGODB_DATABASE_NAME;
		const collectionName = process.env.HILO_COLECTION_NAME;

		const db = mongoDbClient.db(databaseName);
		const collection = db.collection(collectionName);

		const result = await collection.findOneAndUpdate(
			{ _id: new ObjectId(key) },
			{ $inc: { lo: 1 } },
			{ returnDocument: 'after' }
		);

		const newHiLoCounter = new HiLoCounter({
			_id: result.value._id,
			hi: result.value.hi,
			lo: result.value.lo,
			maxLoValue: result.value.maxLoValue,
		});

		return newHiLoCounter;
	}
	async findAndIncrementHiCounterByKey(key: string): Promise<HiLoCounter> {
		const databaseName = process.env.MONGODB_DATABASE_NAME;
		const collectionName = process.env.HILO_COLECTION_NAME;

		const db = mongoDbClient.db(databaseName);
		const collection = db.collection(collectionName);

		const result = await collection.findOneAndUpdate(
			{ _id: new ObjectId(key) },
			{ $inc: { hi: 1 } },
			{ returnDocument: 'after' }
		);

		const newHiLoCounter = new HiLoCounter({
			_id: result.value._id,
			hi: result.value.hi,
			lo: result.value.lo,
			maxLoValue: result.value.maxLoValue,
		});

		return newHiLoCounter;
	}
}

export { HiLoCounterRepository };

