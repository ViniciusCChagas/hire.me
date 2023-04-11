import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		margin-top: 2rem;
	}

	ul {
		width: 80vw;
		list-style: none;

		margin-top: 2rem;

		li {
			display: grid;
			grid-template-columns: repeat(4, 1fr);

			background: var(--white);

			margin: 0.5rem 0;
			padding: 1rem 2rem;

			border-radius: 0.8rem;

			p,
			a {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&:first-of-type {
				font-weight: 600;
			}
		}
	}
`;
