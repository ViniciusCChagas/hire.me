interface IShortedURLStatistics {
	time_taken: string;
}

interface IShortedURL {
	_id?: string;
	alias: string;
	originalUrl: string;
	shortenedRedirectUrl: string;
	statistics: IShortedURLStatistics;
	visitsCount: number;
}

export type { IShortedURL, IShortedURLStatistics };

