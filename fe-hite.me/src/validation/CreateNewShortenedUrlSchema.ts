import * as yup from 'yup';
export const CreateNewShortenedUrlSchema = yup.object().shape(
	{
		url: yup.string().url('URL Inválida').required('URL é obrigatória'),
		customAlias: yup
			.string()
			.nullable()
			.notRequired()
			.when('customAlias', {
				is: (value: string) => value,
				then: (rule) => rule.min(5).max(150),
			}),
	},
	[['customAlias', 'customAlias']]
);
