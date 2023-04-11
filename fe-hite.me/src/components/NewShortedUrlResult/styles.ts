import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	width: 100%;
	max-width: 85vw;

	text-align: center;

	h3 {
		font-size: 1.5rem;
		margin-top: 3rem;
	}

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		margin-top: 3rem;

		p {
			font-size: 1.2rem;
		}

		span {
			font-size: 1.2rem;
			font-weight: 600;

			color: var(--success);
		}
	}
`;
