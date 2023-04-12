import { useShortener } from '../../hooks/useShortener';
import { CustomButton } from '../CustomButton';
import { Container, ErrorMessage, FormGroup } from './styles';

export function CreateNewShortedUrlForm() {
	const {
		newShortenedUrlForm,
		handleCreateNewShortedUrl,
		newShortenedUrlFormErrorMessage,
	} = useShortener();

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = newShortenedUrlForm;

	return (
		<Container onSubmit={handleSubmit(handleCreateNewShortedUrl)}>
			<FormGroup>
				<label htmlFor='url'>*Url</label>
				<p>{errors.url ? errors.url.message : ''}</p>
				<input
					type='text'
					placeholder='Digite a URL que deseja encurtar'
					id='url'
					required
					{...register('url', { required: true })}
				/>
			</FormGroup>
			<FormGroup>
				<label htmlFor='customAlias'>Apelido para a URL (Opcional)</label>
				<p>{errors.customAlias ? errors.customAlias.message : ''}</p>
				<input
					type='text'
					placeholder='Digite um apelido para sua URL'
					id='customAlias'
					{...register('customAlias', { required: false })}
				/>
			</FormGroup>

			<p>*Campo obrigatório</p>
			<ErrorMessage>{newShortenedUrlFormErrorMessage}</ErrorMessage>
			<CustomButton type='submit'>Encurtar URL</CustomButton>
		</Container>
	);
}
