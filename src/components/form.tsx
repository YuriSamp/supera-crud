import { Button, Heading, Input, Select, VStack } from '@chakra-ui/react'
import { FieldErrors, SubmitErrorHandler, SubmitHandler, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { BaseSyntheticEvent, FormEventHandler } from 'react';

interface FormFields {
  id?: string | undefined;
  telefone?: string | undefined;
  idade?: number | undefined;
  nome: string;
  email: string;
  perfil: string;
}

type SubmitType = (e?: BaseSyntheticEvent<object, SubmitHandler<FormFields>, SubmitErrorHandler<FormFields>> | undefined) => Promise<void>

type RegisterType = | {
  type: 'visualize'
  title: string
  defaultValues: FormFields
} | {
  type: 'edit'
  title: string
  defaultValues: FormFields
  register: UseFormRegister<FormFields>
  errors: FieldErrors<FormFields>
  onSubmit: SubmitType
} | {
  type: 'create'
  title: string
  register: UseFormRegister<FormFields>
  errors: FieldErrors<FormFields>
  onSubmit: SubmitType
}

const FormBody = (props: RegisterType) => {

  if (props.type !== 'visualize') {
    return (
      // Não tem problema esse 'as' aqui porque no nosso type a gente força que seja Submit com os FormFields, qualquer coisa fala que eu penso numa tipagem mais elaborada
      <VStack flexDir={'column'} gap={4} borderWidth={1} borderColor={'black'} padding={6} rounded={'md'} >
        <form onSubmit={props.onSubmit as unknown as FormEventHandler<HTMLFormElement>} >
          <VStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Nome'  {...props.register('nome')} />
              <span style={{ color: 'red' }}>{props.errors?.nome?.message}</span>
            </VStack>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Email' type='email' {...props.register('email')} />
              <span style={{ color: 'red' }}>{props.errors?.email?.message}</span>
            </VStack>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Select placeholder='Selecione o perfil' {...props.register('perfil')} >
                <option value='Administrador'>Administrador</option>
                <option value='Usuário Comum'>Usuário Comum</option>
              </Select>
              <span style={{ color: 'red' }}>{props.errors?.perfil?.message}</span>
            </VStack >
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input as={InputMask} mask={'(99) 99999-9999'} placeholder='Telefone' type='tel' {...props.register('telefone')} />
              <span style={{ color: 'red' }}>{props.errors?.telefone?.message}</span>
            </VStack>
            <VStack flexDir={'column'} gap={'2'} w={330}>
              <Input placeholder='Idade' type='number'  {...props.register('idade')} />
              <span style={{ color: 'red' }}>{props.errors?.idade?.message}</span>
            </VStack>
            <Button type='submit' bgColor={'purple.600'} color={'white'} _hover={{}} w={'full'}>Adicionar usuário</Button>
          </VStack>
        </form>
      </VStack>
    )
  }

  return (
    <VStack flexDir={'column'} gap={4} borderWidth={1} borderColor={'black'} padding={6} rounded={'md'} >
      <Heading fontSize={26}>
        {props.title}
      </Heading>
      <VStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
        <VStack flexDir={'column'} gap={'2'} w={330}>
          <Input placeholder='Nome' value={props.defaultValues?.nome} isDisabled />
        </VStack>
        <VStack flexDir={'column'} gap={'2'} w={330}>
          <Input placeholder='Email' type='email' value={props.defaultValues?.email} isDisabled />
        </VStack>
        <VStack flexDir={'column'} gap={'2'} w={330}>
          <Select placeholder='Selecione o perfil' value={props.defaultValues?.perfil} isDisabled>
            <option value='Administrador'>Administrador</option>
            <option value='Usuário Comum'>Usuário Comum</option>
          </Select>
        </VStack >
        <VStack flexDir={'column'} gap={'2'} w={330}>
          <Input as={InputMask} mask={'(99) 99999-9999'} placeholder='Telefone' type='tel' value={props.defaultValues?.telefone} isDisabled />
        </VStack>
        <VStack flexDir={'column'} gap={'2'} w={330}>
          <Input placeholder='Idade' type='number' value={props.defaultValues?.idade} isDisabled />
        </VStack>
        <Button type='submit' bgColor={'purple.600'} color={'white'} _hover={{}} w={'full'} isDisabled>Adicionar usuário</Button>
      </VStack>
    </VStack>
  )
}

export default FormBody
