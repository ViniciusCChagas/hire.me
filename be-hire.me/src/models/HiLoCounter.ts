import { ObjectId } from 'mongodb';

class HiLoCounter {
	_id?: ObjectId;
	hi: number;
	lo: number;
	maxLoValue: number;

	constructor(params: { _id?: ObjectId; hi: number; lo: number; maxLoValue: number }) {
		this._id = params._id ? new ObjectId(params._id) : null;
		this.hi = params.hi;
		this.lo = params.lo;
		this.maxLoValue = params.maxLoValue;
	}
}

export { HiLoCounter };

