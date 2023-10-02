import * as yup from 'yup';

export const formSchema = yup.object({
  id: yup.string().optional(),
  nome: yup
    .string()
    .required('Nome é um campo obrigatorio')
    .min(3, 'Mínimo de 3 caractéres permitidos')
    .max(100, 'Máximo de 100 caractéres permitidos'),
  email: yup
    .string()
    .required('Email é um campo obrigatorio')
    .email('Pro favor insira um email válido'),
  perfil: yup.string().required('Perfil é um campo obrigatorio'),
  telefone: yup.string().optional(),
  idade: yup.number().optional().typeError('Idade deve ser do tipo numerico'),
});

export type user = yup.InferType<typeof formSchema>;
