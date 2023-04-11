import { Request, Response } from 'express';
import { ValidationError, object, string } from 'yup';
import { ShortenedUrlCustomError } from '../../models/ShortenedUrlCustomError';
import { calculateTimeElapsed } from '../../utils';
import { CreateNewShortenedUrlUseCase } from './CreateNewShortenedUrlUseCase';

class CreateNewShortnedUrlController {
	private createNewShortenedUrlUseCase: CreateNewShortenedUrlUseCase;
	constructor(createNewShortenedUrlUseCase: CreateNewShortenedUrlUseCase) {
		this.createNewShortenedUrlUseCase = createNewShortenedUrlUseCase;
	}

	async handle(request: Request, response: Response) {
		const { url, customAlias } = request.body;

		const startTime = performance.now();

		const paramsValidationSchema = object({
			url: string().required().url(),
			customAlias: string().optional().min(5).max(150).nullable(),
		});

		try {
			await paramsValidationSchema.validate({
				url,
				customAlias,
			});

			const newShortenedUrl = await this.createNewShortenedUrlUseCase.execute({
				url: url as string,
				customAlias: customAlias as string,
			});

			const endTime = performance.now();

			const { timeElapsedInMileseconds } = calculateTimeElapsed(startTime, endTime);

			const res = {
				alias: newShortenedUrl.alias,
				originalUrl: newShortenedUrl.url,
				shortenedRedirectUrl: `${process.env.SERVER_URL}/r/${newShortenedUrl.alias}`,
				shortenedUrl: `${process.env.SERVER_URL}/${newShortenedUrl.alias}`,
				statistics: {
					time_taken: `${timeElapsedInMileseconds.toFixed(0)}ms`,
				},
			} as IResponseCreateNewShortnedUrlDto;

			return response.status(201).send(res);
		} catch (error) {
			let errorResponse = {} as IErrorResponseCreateNewShortnedUrlDto;
			let errorStatusCode = 500;
			let err_code = '000';
			const isYupValidationError = error instanceof ValidationError;

			if (isYupValidationError) {
				errorStatusCode = 400;
			}

			const isCreateShortenedUrlError = error instanceof ShortenedUrlCustomError;
			if (isCreateShortenedUrlError) {
				errorStatusCode = error.httpStatusCode;
				err_code = error.errorCode;
				errorResponse.alias = customAlias as string;
			}

			errorResponse = {
				...errorResponse,
				description: error.message,
				err_code,
			};

			return response.status(errorStatusCode).json(errorResponse);
		}
	}
}
export { CreateNewShortnedUrlController };

