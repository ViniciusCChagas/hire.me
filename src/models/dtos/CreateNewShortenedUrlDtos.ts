interface IParamsCreateNewShortnedUrlDto {
	url: string;
	customAlias?: string;
}

interface ShortnedUrlStatistics {
	time_taken: string;
}

interface IResponseCreateNewShortnedUrlDto {
	alias: string;
	shortenedRedirectUrl: string;
	shortenedUrl: string;
	originalUrl: string;
	statistics?: ShortnedUrlStatistics;
}

interface IErrorResponseCreateNewShortnedUrlDto {
	alias?: string;
	err_code: string;
	description: string;
}
