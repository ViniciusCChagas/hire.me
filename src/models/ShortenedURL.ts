import { ObjectId } from 'mongodb';

class ShortenedURL {
	_id?: ObjectId;
	alias: string;
	url: string;
	createdAt: Date;

	constructor(params: { _id?: string; url: string; alias: string; createdAt: Date }) {
		this._id = params._id ? new ObjectId(params._id) : null;
		this.alias = params.alias;
		this.url = params.url;
		this.createdAt = params.createdAt;
	}
}

export { ShortenedURL };

