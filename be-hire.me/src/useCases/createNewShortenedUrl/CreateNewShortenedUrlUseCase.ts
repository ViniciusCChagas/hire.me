import { ShortenedURL } from '../../models/ShortenedURL';
import { ShortenedUrlCustomError } from '../../models/ShortenedUrlCustomError';
import { IHiLoCounterRepository } from '../../repositories/interfaces/IHiLoCounterRepository';
import { IShortenedURLRepository } from '../../repositories/interfaces/IShortenedURLRepository';
import HiLoIdGenerator from '../../services/HiLoGeneratorService';
import { encodeNumberToBase62 } from '../../utils';

class CreateNewShortenedUrlUseCase {
	private shortenedURLRepository: IShortenedURLRepository;
	private hiLoCounterRepository: IHiLoCounterRepository;
	constructor(
		shortenedURLRepository: IShortenedURLRepository,
		hiLoCounterRepository: IHiLoCounterRepository
	) {
		this.shortenedURLRepository = shortenedURLRepository;
		this.hiLoCounterRepository = hiLoCounterRepository;
	}

	async execute(params: IParamsCreateNewShortnedUrlDto) {
		const { url, customAlias } = params;

		let alias = null;
		if (customAlias) {
			const isAliasAlreadyInUse =
				await this.shortenedURLRepository.findShortenedUrlByAlias(customAlias);

			if (isAliasAlreadyInUse) {
				throw new ShortenedUrlCustomError(
					'CUSTOM ALIAS ALREADY EXISTS',
					'001',
					400
				);
			}

			alias = customAlias;
		} else {
			const hiLoGenerator = new HiLoIdGenerator(this.hiLoCounterRepository);
			await hiLoGenerator.init();

			const hiLoUniqueID = await hiLoGenerator.getNextId();

			alias = await encodeNumberToBase62(hiLoUniqueID);
		}

		const newShortenedUrl = new ShortenedURL({
			alias: alias,
			url: url,
			createdAt: new Date(),
			visitCount: 0,
		});

		await this.shortenedURLRepository.createNewShortenedUrl(newShortenedUrl);

		return {
			alias: alias,
			url: url,
		};
	}
}

export { CreateNewShortenedUrlUseCase };

