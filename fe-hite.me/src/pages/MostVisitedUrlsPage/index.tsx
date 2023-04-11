import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

interface MostVisitedUrlsDto {
	_id: string;
	alias: string;
	url: string;
	visitCount: number;
	createdAt: Date;
}

export function MostVisistedUrlsPage() {
	const [mostVisitedUrls, setMostVisitedUrls] = useState<MostVisitedUrlsDto[]>([]);
	useEffect(() => {
		api.get('/mostVisitedUrls').then((response) => {
			console.log(response.data);
			setMostVisitedUrls(response.data);
		});
	}, []);
	return (
		<Container>
			<h1>Top 10 URLs mais visitadas</h1>
			<ul>
				<li key='head'>
					<p>#</p>
					<p>Apelido</p>
					<p>URL Original</p>
					<p>Total de Visitas</p>
				</li>

				{mostVisitedUrls.map((url, index) => {
					const shortenedUrl = `${process.env.REACT_APP_API_URL}/r/${url.alias}`;
					return (
						<li key={url._id}>
							<p>#{index + 1}</p>
							<a href={shortenedUrl} target='__blank'>
								/{url.alias}
							</a>
							<p>{url.url}</p>
							<p>{url.visitCount}</p>
						</li>
					);
				})}
			</ul>
		</Container>
	);
}
