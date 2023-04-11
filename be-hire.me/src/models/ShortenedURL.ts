import { ObjectId } from 'mongodb';

class ShortenedURL {
	_id?: ObjectId;
	alias: string;
	url: string;
	createdAt: Date;
	visitCount: number;

	constructor(params: {
		_id?: string;
		url: string;
		alias: string;
		createdAt: Date;
		visitCount: number;
	}) {
		this._id = params._id ? new ObjectId(params._id) : null;
		this.alias = params.alias;
		this.url = params.url;
		this.createdAt = params.createdAt;
		this.visitCount = params.visitCount;
	}
}

export { ShortenedURL };

