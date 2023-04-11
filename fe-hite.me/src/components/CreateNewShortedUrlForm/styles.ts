import styled from 'styled-components';
import { device } from '../../styles/breakpoints';

export const Container = styled.form`
	display: flex;
	justify-content: center;

	flex-direction: column;

	width: 55%;

	max-width: 85vw;

	${device.md`
    	width: 100%;
    `};

	& > p {
		font-size: 0.8rem;
		font-style: italic;

		color: var(--grey);
	}
`;

export const FormGroup = styled.div`
	width: 100%;

	display: flex;
	justify-content: center;

	flex-direction: column;

	label {
		font-size: 1.2rem;

		margin-bottom: 0.3rem;

		color: var(--blue);
	}

	p {
		font-size: 0.8rem;
		font-style: italic;
		color: var(--danger);
	}

	input {
		width: 100%;
		height: 60px;

		padding: 0.8rem 1.2rem;

		font-size: 1.1rem;

		margin-bottom: 1rem;

		border-radius: 15px;

		border: solid var(--blue) 1px;
	}
`;

export const ErrorMessage = styled.p`
	text-align: center;
	font-style: normal !important;

	font-size: 1.2rem !important;
	font-weight: 600 !important;

	color: var(--danger) !important;

	margin-top: 2rem;
	margin-bottom: 2rem;
`;
