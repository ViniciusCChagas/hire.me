import { useShortener } from '../../hooks/useShortener';
import { CustomButton } from '../CustomButton';
import { Container } from './styles';

export function NewShortedUrlResult() {
	const { handleUpdateShortenedUrl, shortenedUrl } = useShortener();
	return (
		<Container>
			<h2>URL encurtada com sucesso!</h2>
			<h3>
				<a href={shortenedUrl?.shortenedRedirectUrl}>
					{shortenedUrl?.shortenedRedirectUrl}
				</a>
			</h3>
			<div>
				<p>Tempo da operação</p>
				<span>{shortenedUrl?.statistics.time_taken}</span>
			</div>

			<CustomButton
				type='button'
				onClick={() => {
					handleUpdateShortenedUrl(null);
				}}
			>
				Encurtar outra URL
			</CustomButton>
		</Container>
	);
}
