import { HStack, Heading, Input, Button, Select } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { formSchema } from '../lib/schema/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup'

const Visualize = () => {

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
      <HStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} placeItems={'center'} gap={20} paddingX={'96'}>
        <HStack>
          <Heading>
            Teste
          </Heading>
          <HStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
            <Input placeholder='Nome' />
            <Input placeholder='Email' />
            <Select placeholder='Selecione o perfil' >
              <option value='Administrador'>Administrador</option>
              <option value='Usuário Comum'>Usuário Comum</option>
            </Select>
            <Input placeholder='Telefone' />
            <Input placeholder='Idade' />
            <Button type='submit'>Adicionar usuário</Button>
          </HStack>
        </HStack>
      </HStack>
    </>
  )
}

export default Visualize
