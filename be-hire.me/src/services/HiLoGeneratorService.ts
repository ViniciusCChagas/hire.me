import { HiLoCounter } from '../models/HiLoCounter';
import { IHiLoCounterRepository } from '../repositories/interfaces/IHiLoCounterRepository';

class HiLoIdGenerator {
	private hiLoCounter: HiLoCounter;
	private hiLoCounterRepository: IHiLoCounterRepository;

	constructor(hiLoCounterRepository: IHiLoCounterRepository) {
		this.hiLoCounterRepository = hiLoCounterRepository;
	}

	public async init(): Promise<void> {
		this.hiLoCounter = await this.hiLoCounterRepository.findHiLoCounter();

		if (!this.hiLoCounter) {
			this.hiLoCounter = await this.hiLoCounterRepository.initHiLoCounter();
		}
	}

	public async getNextId(): Promise<number> {
		const hiLoCounter =
			await this.hiLoCounterRepository.findAndIncrementLoCounterByKey(
				this.hiLoCounter._id.toHexString()
			);

		if (hiLoCounter.lo >= hiLoCounter.maxLoValue) {
			const newHiCounter =
				await this.hiLoCounterRepository.findAndIncrementHiCounterByKey(
					this.hiLoCounter._id.toHexString()
				);
			hiLoCounter.lo = 1;
			hiLoCounter.hi = newHiCounter.hi;
		}

		const id = hiLoCounter.hi * (hiLoCounter.maxLoValue + 1) + hiLoCounter.lo;
		return id;
	}
}

export default HiLoIdGenerator;
