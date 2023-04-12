import { Container } from './styles';

export function ShortedUrlNotFoundPage() {
	return (
		<Container>
			<h1>URL não encontrada!</h1>

			<a href='/'>Clique aqui para encurtar uma URL</a>
		</Container>
	);
}
