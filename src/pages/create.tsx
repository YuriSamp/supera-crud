import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import Navbar from '../components/navbar'
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom";
import dataDb from '../data/db.json'
import FormBody from '../components/form';
import { ROUTES } from '../config/routes';
import { useMutation } from '@tanstack/react-query';
import { addUser } from '../services/http/requests';
import { API_DEFAULT_ERROR } from '../config/constants';

const formSchema = yup.object({
  id: yup.string().optional(),
  name: yup
    .string()
    .required('Nome é um campo obrigatorio')
    .min(3, 'Mínimo de 3 caractéres permitidos')
    .max(100, 'Máximo de 100 caractéres permitidos'),
  email: yup
    .string()
    .required('Email é um campo obrigatorio')
    .email('Pro favor insira um email válido'),
  userType: yup.string().required('Perfil é um campo obrigatorio'),
  phone: yup.string().optional(),
  age: yup.number().optional().typeError('Idade deve ser do tipo numerico')
});

export interface FormType extends yup.InferType<typeof formSchema> { }

const styles: Record<string, SystemStyleObject> = {
  container: {
    height: 'calc(100vh)',
    bg: 'ghostwhite',
    flexDir: 'column',
    placeItems: 'center',
    gap: '40',
    paddingX: { lg: '24', xl: '80' }
  }
}

const Create = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormType>({
    resolver: yupResolver(formSchema)
  })


  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success('Usuario adicionado com sucesso')
      setTimeout(() => {
        navigate(ROUTES.HOME)
      }, 1000)
    },
    onError: () => {
      toast.error(API_DEFAULT_ERROR)
    }
  },)

  const onSubmit = (data: FormType) => {
    const { email, name, userType, age, phone } = data

    const personObj = {
      id: String(dataDb.user.length),
      email,
      name,
      userType,
      age,
      phone
    }

    mutation.mutate(personObj)
  }

  return (
    <VStack sx={styles.container}>
      <Navbar />
      <FormBody
        title='Criar novo usuário'
        type='create'
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
      />
    </VStack>
  )
}

export default Create
