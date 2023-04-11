import { HiLoCounter } from '../../models/HiLoCounter';

interface IHiLoCounterRepository {
	findHiLoCounter(): Promise<HiLoCounter>;
	initHiLoCounter(): Promise<HiLoCounter>;
	findAndIncrementLoCounterByKey(key: string): Promise<HiLoCounter>;
	findAndIncrementHiCounterByKey(key: string): Promise<HiLoCounter>;
}

export { IHiLoCounterRepository };

