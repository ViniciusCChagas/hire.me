import { Request, Response } from 'express';
import { ValidationError, object, string } from 'yup';
import { ShortenedUrlCustomError } from '../../models/ShortenedUrlCustomError';
import { RetrieveShortenedUrlUseCase } from './RetrieveShortenedUrlUseCase';

class RetrieveShortenedUrlController {
	private retrieveShortenedUrlUseCase: RetrieveShortenedUrlUseCase;

	constructor(retrieveShortenedUrlUseCase: RetrieveShortenedUrlUseCase) {
		this.retrieveShortenedUrlUseCase = retrieveShortenedUrlUseCase;
	}

	async handle(request: Request, response: Response) {
		const { alias, redirect } = request.params;

		const paramsValidationSchema = object({
			alias: string().required().min(5).max(150),
		});

		try {
			await paramsValidationSchema.validate({
				alias,
			});

			const shortenedUrl = await this.retrieveShortenedUrlUseCase.execute(alias);

			if (redirect === 'true') {
				return response.redirect(shortenedUrl.url);
			}

			return response.status(200).send({
				alias: shortenedUrl.alias,
				url: shortenedUrl.url,
				createdAt: shortenedUrl.createdAt,
			});
		} catch (error) {
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
			}

			const errorResponse = {
				description: error.message,
				err_code,
			};

			return response.status(errorStatusCode).json(errorResponse);
		}
	}
}

export { RetrieveShortenedUrlController };

