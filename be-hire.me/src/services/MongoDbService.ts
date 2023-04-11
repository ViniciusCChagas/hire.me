import { MongoClient } from 'mongodb';

const mongoDbClient = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export { mongoDbClient };

