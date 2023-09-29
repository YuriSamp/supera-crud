import * as yup from 'yup';

export const formSchema = yup.object({
  nome: yup
    .string()
    .min(3, 'Mínimo de 3 caractéres permitidos')
    .max(100, 'Máximo de 100 caractéres permitidos')
    .required(),
  email: yup.string().required().email(),
  perfil: yup.mixed<'Usuário Comum' | 'Administrador'>().required(),
  telefone: yup.string().optional(),
  idade: yup.number().optional(),
});
