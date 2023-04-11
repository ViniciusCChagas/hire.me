import loadingIcon from '../../assets/loading-circle.svg';
import { useShortener } from '../../hooks/useShortener';
import { Container } from './styles';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function CustomButton({ children, ...rest }: CustomButtonProps) {
	const { isLoading } = useShortener();

	return (
		<Container {...rest}>
			{isLoading ? <img src={loadingIcon} alt='Icone de carragamento' /> : children}
		</Container>
	);
}
