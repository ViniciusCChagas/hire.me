import { ShortenerProvider } from './hooks/useShortener';
import AppRoutes from './routes';
import { GlobalStyle } from './styles/global';

function App() {
	return (
		<ShortenerProvider>
			<AppRoutes />
			<GlobalStyle />
		</ShortenerProvider>
	);
}

export default App;
