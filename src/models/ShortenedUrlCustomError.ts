class ShortenedUrlCustomError extends Error {
	errorCode: string;
	httpStatusCode: number;

	constructor(message: string, errorCode: string, httpStatusCode: number) {
		super(message);
		this.errorCode = errorCode;
		this.httpStatusCode = httpStatusCode;
	}
}

export { ShortenedUrlCustomError };

