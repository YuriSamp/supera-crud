import { HStack, Heading, Input, Button, Select } from '@chakra-ui/react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import { formSchema } from '../lib/schema/form'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify';

const Edit = () => {

  const { id } = useParams()

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
      <HStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} justifyContent={'center'} placeItems={'center'} paddingX={'96'}>
        <Heading>
          Teste
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} >
          <HStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
            <Input placeholder='Nome'  {...register('nome')} />
            <Input placeholder='Email' {...register('email')} />
            <Select placeholder='Selecione o perfil' {...register('perfil')}>
              <option value='Administrador'>Administrador</option>
              <option value='Usuário Comum'>Usuário Comum</option>
            </Select>
            <Input placeholder='Telefone' {...register('telefone')} />
            <Input placeholder='Idade'  {...register('idade')} />
            <Button type='submit' >Adicionar usuário</Button>
          </HStack>
        </form>
      </HStack>
    </>
  )
}

export default Edit
