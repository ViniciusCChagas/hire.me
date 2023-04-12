import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MostVisistedUrlsPage } from './pages/MostVisitedUrlsPage';
import { NewShortenedUrlPage } from './pages/NewShortenedUrlPage';
import { ShortedUrlNotFoundPage } from './pages/ShortedUrlNotFoundPage';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<NewShortenedUrlPage />} />
				<Route path='/404' element={<ShortedUrlNotFoundPage />} />
				<Route path='/maisVisitadas' element={<MostVisistedUrlsPage />} />
			</Routes>
		</BrowserRouter>
	);
}
