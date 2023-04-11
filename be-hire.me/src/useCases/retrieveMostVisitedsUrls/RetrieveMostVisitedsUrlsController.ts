import { Request, Response } from 'express';
import { RetrieveMostVisitedUrlsUseCase } from './RetrieveMostVisitedUrlsUseCase';

class RetrieveShortenedUrlController {
	private retrieveMostVisitedUrlsUseCase: RetrieveMostVisitedUrlsUseCase;

	constructor(retrieveMostVisitedUrlsUseCase: RetrieveMostVisitedUrlsUseCase) {
		this.retrieveMostVisitedUrlsUseCase = retrieveMostVisitedUrlsUseCase;
	}

	async handle(request: Request, response: Response) {
		try {
			const mostVisitedUrls = await this.retrieveMostVisitedUrlsUseCase.execute();

			return response.status(200).json(mostVisitedUrls);
		} catch (error) {
			return response.status(500).json({
				description: error.message,
				err_code: '000',
			});
		}
	}
}

export { RetrieveShortenedUrlController };

