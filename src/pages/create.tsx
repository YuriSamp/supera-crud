import { Heading, Input, Button, Select, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from 'yup'
import { formSchema } from '../lib/schema/form'
import Navbar from '../components/navbar'
import { toast, ToastContainer } from 'react-toastify';

const Create = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof formSchema>>()


  const onSubmit: SubmitHandler<yup.InferType<typeof formSchema>> = (data) => {
    console.log(data)
    toast.success('Teste')
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
