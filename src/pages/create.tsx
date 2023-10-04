import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import Navbar from '../components/navbar'
import { toast } from 'react-toastify';
import { request } from '../lib/http'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom";
import dataDb from '../data/db.json'
import FormBody from '../components/form';
import { ROUTES } from '../config/routes';

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

export type FormType = yup.InferType<typeof formSchema>

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


  const onSubmit = async (data: FormType) => {
    const { email, name, userType, age, phone } = data

    const personObj = {
      id: String(dataDb.user.length),
      email,
      name,
      userType,
      age,
      phone
    }

    const { status } = await request.post('/user', personObj)
    if (status === 201) {
      toast.success('Usuario adicionado com sucesso')
      setTimeout(() => {
        navigate(ROUTES.HOME)
      }, 1000)
    }

    toast.error('Algo deu errado tente novamente')
    return
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
