import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	flex-direction: column;

	margin: auto;

	max-width: var(--max-width);

	header {
		display: flex;
		justify-content: center;
		flex-direction: column;

		font-size: 1.5rem;
		font-weight: 600;
		color: var(--blue);

		margin-top: 10vh;
		margin-bottom: 5vh;

		img {
			height: 4rem;
			margin-right: 1rem;
		}
	}

	main {
		display: flex;
		align-items: center;
		justify-content: center;

		flex-direction: column;

		width: 100%;
	}
	
	footer {
		margin-top: 1rem;
	}
`;
