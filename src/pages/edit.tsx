import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup'
import Navbar from '../components/navbar'
import { request } from '../lib/http'
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../config/routes';
import FormBody from '../components/form';
import { FormType } from './create';
import { useQuery } from '@tanstack/react-query';
import { user } from '../types/user';
import { useEffect } from 'react';


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


const Edit = () => {

  const navigate = useNavigate()
  const { id } = useParams()


  const fetchuser = async () => {
    const { data } = await request.get<user[]>(`/user?id=${id}`)
    return data.at(0)
  }

  const { data: user } = useQuery({
    queryFn: fetchuser,
    queryKey: ['user']
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: user
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('age', user.age)
      setValue('phone', user.phone)
      setValue('email', user.email)
      setValue('userType', user.userType)
    }
  }, [user, setValue])



  const onSubmit = async (data: FormType) => {
    try {
      const { status } = await request.put(`/user/${id}`, data)
      if (status === 200) {
        toast.success('Usuario editado com sucesso')
        setTimeout(() => {
          navigate(ROUTES.HOME)
        }, 1000)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
    }
  }

  return (
    <VStack sx={styles.container}>
      <Navbar />
      <FormBody
        type='edit'
        register={register}
        title='Editar um usuário'
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        defaultValues={user as user}
      />
    </VStack>
  )
}

export default Edit
