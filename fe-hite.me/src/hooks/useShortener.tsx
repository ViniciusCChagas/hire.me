import { AxiosError } from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { IShortedURL } from '../models/IShortenedURL';
import { api } from '../services/api';
import { CreateNewShortenedUrlSchema } from '../validation/CreateNewShortenedUrlSchema';
import { useYupValidationResolver } from './useYupValidationResolver';

interface ShortenerProviderProps {
	children: ReactNode;
}

interface createNewShortedUrlFormData {
	url: string;
	customAlias?: string;
}

interface ShortenerContextData {
	shortenedUrl: IShortedURL | null;
	newShortenedUrlForm: UseFormReturn<createNewShortedUrlFormData>;
	newShortenedUrlFormErrorMessage: string | null;
	isLoading: boolean;
	handleUpdateShortenedUrl: (shortenedUrl: IShortedURL | null) => void;
	handleCreateNewShortedUrl: (formData: any) => void;
}

const ShortenerContext = createContext<ShortenerContextData>({} as ShortenerContextData);

export const ShortenerProvider = function ({ children }: ShortenerProviderProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [shortenedUrl, setShortenedUrl] = useState<IShortedURL | null>(null);

	const resolver = useYupValidationResolver(CreateNewShortenedUrlSchema);
	const newShortenedUrlForm = useForm<createNewShortedUrlFormData>({ resolver });
	const [newShortenedUrlFormErrorMessage, setNewShortenedUrlFormErrorMessage] =
		useState<string | null>(null);

	async function handleCreateNewShortedUrl(formData: any) {
		try {
			setIsLoading(true);

			const { data } = await api.post('/create', {
				url: formData.url,
				customAlias: formData.customAlias ? formData.customAlias : null,
			});

			handleUpdateShortenedUrl(data);
			setNewShortenedUrlFormErrorMessage(null);

			newShortenedUrlForm.reset();
		} catch (error) {
			if (error instanceof AxiosError) {
				let errorMessage = null;
				if (error.response?.data.err_code === '001') {
					errorMessage = 'Este apelido já está em uso!';
				} else {
					errorMessage =
						'Ocorreu um erro inesperado, tente novamente mais tarde';
				}
				setNewShortenedUrlFormErrorMessage(errorMessage);
			}
		}
		setIsLoading(false);
	}

	function handleUpdateShortenedUrl(shortenedUrl: IShortedURL | null) {
		setNewShortenedUrlFormErrorMessage(null);
		setShortenedUrl(shortenedUrl);
	}

	return (
		<ShortenerContext.Provider
			value={{
				shortenedUrl,
				newShortenedUrlForm,
				newShortenedUrlFormErrorMessage,
				isLoading,
				handleUpdateShortenedUrl,
				handleCreateNewShortedUrl,
			}}
		>
			{children}
		</ShortenerContext.Provider>
	);
};

export function useShortener() {
	const context = useContext(ShortenerContext);

	return context;
}
