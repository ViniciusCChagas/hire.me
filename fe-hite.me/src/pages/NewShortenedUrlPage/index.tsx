import linkIcon from '../../assets/link-icon.svg';
import { CreateNewShortedUrlForm } from '../../components/CreateNewShortedUrlForm';
import { NewShortedUrlResult } from '../../components/NewShortedUrlResult';
import { useShortener } from '../../hooks/useShortener';
import '../../services/YupTranslateService';
import { Container } from './styles';

function NewShortenedUrlPage() {
	const { shortenedUrl } = useShortener();

	return (
		<Container>
			<header>
				<img src={linkIcon} alt='icone de link' />
				<h1>Encurtador</h1>
			</header>
			<main>
				{!shortenedUrl ? <CreateNewShortedUrlForm /> : <NewShortedUrlResult />}
			</main>
			<footer>
				<a href='/maisVisitadas'>Veja o TOP 10 de URLs mais visitadas aqui!</a>
			</footer>
		</Container>
	);
}

export { NewShortenedUrlPage };

