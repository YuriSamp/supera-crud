import * as yup from 'yup';

export const formSchema = yup.object({
  identificador: yup.string().optional(),
  nome: yup
    .string()
    .min(3, 'Mínimo de 3 caractéres permitidos')
    .max(100, 'Máximo de 100 caractéres permitidos')
    .required(),
  email: yup.string().required().email(),
  perfil: yup.string().required(),
  telefone: yup.string().optional(),
  idade: yup.number().optional(),
});

export type user = yup.InferType<typeof formSchema>;
