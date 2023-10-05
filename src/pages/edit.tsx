import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup'
import Navbar from '../components/navbar'
import { request } from '../services/http'
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../config/routes';
import FormBody from '../components/form';
import { FormType } from './create';
import { useMutation, useQuery } from '@tanstack/react-query';
import { user } from '../types/user';
import { useEffect } from 'react';
import { updateUser } from '../services/http/requests';
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

type MutationType = { data: FormType, id: string }

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
  }, [user, setValue, id])


  const mutation = useMutation({
    mutationFn: ({ data, id }: MutationType) => updateUser(data, id),
    onSuccess: () => {
      toast.success('Usuario editado com sucesso')
      setTimeout(() => {
        navigate(ROUTES.HOME)
      }, 1000)
    },
    onError: () => {
      toast.error(API_DEFAULT_ERROR)
    }
  })

  const onSubmit = (data: FormType) => {
    mutation.mutate({ data, id: String(id) })
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
