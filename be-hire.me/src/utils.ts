import crypto from 'crypto';

async function encodeNumberToBase62(number: number, length: number = 7) {
	const hash = crypto.createHash('sha256').update(number.toString()).digest('hex');
	let base10 = parseInt(hash.slice(0, 12), 16);
	const allowedChars = '123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ';
	let reduced = '';

	while (base10 > 0 && reduced.length < length) {
		const remainder = base10 % 36;
		reduced = allowedChars.charAt(remainder) + reduced;
		base10 = Math.floor(base10 / 36);
	}

	return reduced.padStart(length, '0');
}

function calculateTimeElapsed(startTime: number, endTime: number) {
	const timeElapsed = endTime - startTime;
	const timeElapsedInSeconds = timeElapsed / 1000;
	const timeElapsedInMinutes = timeElapsedInSeconds / 60;
	const timeElapsedInHours = timeElapsedInMinutes / 60;
	const timeElapsedInDays = timeElapsedInHours / 24;

	return {
		timeElapsedInMileseconds: timeElapsed,
		timeElapsedInSeconds,
		timeElapsedInMinutes,
		timeElapsedInHours,
		timeElapsedInDays,
	};
}

export { encodeNumberToBase62, calculateTimeElapsed };

