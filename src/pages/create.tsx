import { Heading, Input, Button, Select, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from 'yup'
import { formSchema } from '../lib/schema/form'
import Navbar from '../components/navbar'
import { toast, ToastContainer } from 'react-toastify';
import { request } from '../lib/http'
import { useAtomValue } from 'jotai'
import { userAtom } from '../lib/context'

const Create = () => {

  const users = useAtomValue(userAtom)

  const {
    register,
    handleSubmit,
  } = useForm<yup.InferType<typeof formSchema>>()

  const onSubmit: SubmitHandler<yup.InferType<typeof formSchema>> = async (data) => {
    try {
      const userData = formSchema.validateSync(data)
      const { status } = await request.post('/user', { id: userData.id = String(users.length), ...userData })
      if (status === 201) {
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
    <>
      <ToastContainer />
      <VStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} placeItems={'center'} gap={40} paddingX={'96'}>
        <Navbar />
        <VStack flexDir={'column'} gap={4} borderWidth={1} borderColor={'black'} padding={6} rounded={'md'} className='brutalism-box'>
          <Heading fontSize={26}>
            Criar novo usuário
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} >
            <VStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
              <Input placeholder='Nome'  {...register('nome')} w={330} />
              <Input placeholder='Email' {...register('email')} />
              <Select placeholder='Selecione o perfil' {...register('perfil')} >
                <option value='Administrador'>Administrador</option>
                <option value='Usuário Comum'>Usuário Comum</option>
              </Select>
              <Input placeholder='Telefone' {...register('telefone')} />
              <Input placeholder='Idade'  {...register('idade')} />
              <Button type='submit' bgColor={'purple.600'} color={'white'} _hover={{}} w={'full'}>Adicionar usuário</Button>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </>
  )
}

export default Create
