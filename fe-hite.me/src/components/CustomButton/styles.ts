import styled from 'styled-components';
import { device } from '../../styles/breakpoints';

export const Container = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 60%;
	height: 60px;

	font-size: 1.2rem;
	font-weight: 600;

	border-radius: 15px;
	border: 0;

	margin: 0 auto;
	margin-top: 2rem;

	background: var(--blue);
	color: var(--white);

	padding: 0.8rem 1.2rem;

	transition: all 0.2s ease-in-out;
	&:hover {
		background: var(--light-blue);
	}

	${device.md`
    		width: 100%;
    		`};

	img {
		height: 1.5rem;
		margin: auto 0 auto 1rem;
	}
`;
