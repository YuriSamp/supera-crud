import { Heading, Input, Button, Select, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import { formSchema } from '../lib/schema/form'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { useAtomValue } from 'jotai'
import { userAtom } from '../lib/context'
import { yupResolver } from '@hookform/resolvers/yup'
import Navbar from '../components/navbar'
import { request } from '../lib/http'

const Edit = () => {

  const users = useAtomValue(userAtom)
  const { id } = useParams()
  const user = users.filter(user => user.id === id)[0]

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: user
  })

  const onSubmit: SubmitHandler<yup.InferType<typeof formSchema>> = async (data) => {
    try {
      const userData = formSchema.validateSync(data)
      const { status } = await request.put(`/user/${id}`, userData)
      if (status === 204) {
        toast.success('Deu tudo certo')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
    }
  }

  return (
    <VStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} placeItems={'center'} gap={40} paddingX={'96'}>
      <Navbar />
      <VStack flexDir={'column'} gap={4} borderWidth={1} borderColor={'black'} padding={6} rounded={'md'} className='brutalism-box'>
        <Heading fontSize={26}>
          Editar um usuário
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} >
          <VStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Nome'  {...register('nome')} />
              <span style={{ color: 'red' }}>{errors.nome && errors.nome?.message}</span>
            </VStack>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Email' {...register('email')} />
              <span style={{ color: 'red' }}>{errors.email && errors.email?.message}</span>
            </VStack>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Select placeholder='Selecione o perfil' {...register('perfil')} >
                <option value='Administrador'>Administrador</option>
                <option value='Usuário Comum'>Usuário Comum</option>
              </Select>
              <span style={{ color: 'red' }}>{errors.perfil && errors.perfil.message}</span>
            </VStack >
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Telefone' {...register('telefone')} />
              <span style={{ color: 'red' }}>{errors.telefone && errors.telefone.message}</span>
            </VStack>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Idade'  {...register('idade')} />
              <span style={{ color: 'red' }}>{errors.idade && errors.idade.message}</span>
            </VStack>
            <Button type='submit' bgColor={'purple.600'} color={'white'} _hover={{}} w={'full'}>Editar usuário</Button>
          </VStack>
        </form>
      </VStack>
    </VStack>
  )
}

export default Edit
