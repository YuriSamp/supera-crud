import { Button, Heading, Input, Select, SystemStyleObject, VStack } from '@chakra-ui/react'
import { FieldErrors, SubmitErrorHandler, SubmitHandler, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { BaseSyntheticEvent, FormEventHandler } from 'react';
import { user } from '../types/user';

type SubmitType = (e?: BaseSyntheticEvent<object, SubmitHandler<user>, SubmitErrorHandler<user>> | undefined) => Promise<void>

type RegisterType = | {
  type: 'visualize'
  title: string
  defaultValues: user
} | {
  type: 'edit'
  title: string
  defaultValues: user
  register: UseFormRegister<user>
  errors: FieldErrors<user>
  onSubmit: SubmitType
} | {
  type: 'create'
  title: string
  register: UseFormRegister<user>
  errors: FieldErrors<user>
  onSubmit: SubmitType
}


const styles: Record<string, SystemStyleObject> = {
  container: {
    flexDir: 'column',
    gap: 4,
    borderWidth: 1,
    borderColor: 'black',
    padding: 6,
    rounded: 'md'
  },
  heading: {
    fontSize: 26
  },
  inputContainer: {
    flexDir: 'column',
    gap: 2,
    width: 330
  },
  formContainer: {
    flexDir: 'column',
    justifyContent: 'center',
    placeItems: 'center',
    gap: '3'
  }
}


const FormBody = (props: RegisterType) => {

  if (props.type !== 'visualize') {
    return (
      <VStack sx={styles.container} >
        <Heading sx={styles.heading}>
          {props.title}
        </Heading>
        {/* Não tem problema esse 'as' aqui porque no nosso type a gente força que seja Submit com os FormFields, qualquer coisa fala que eu penso numa tipagem mais elaborada */}
        <form onSubmit={props.onSubmit as unknown as FormEventHandler<HTMLFormElement>} >
          <VStack sx={styles.formContainer}>
            <VStack sx={styles.inputContainer}>
              <Input placeholder='Nome' {...props.register('name')} />
              <span style={{ color: 'red' }}>{props.errors?.name?.message}</span>
            </VStack>
            <VStack sx={styles.inputContainer}>
              <Input placeholder='Email' type='email' {...props.register('email')} />
              <span style={{ color: 'red' }}>{props.errors?.email?.message}</span>
            </VStack>
            <VStack sx={styles.inputContainer}>
              <Select placeholder='Selecione o perfil' {...props.register('userType')} >
                <option value='Administrador'>Administrador</option>
                <option value='Usuário Comum'>Usuário Comum</option>
              </Select>
              <span style={{ color: 'red' }}>{props.errors?.userType?.message}</span>
            </VStack >
            <VStack sx={styles.inputContainer}>
              <Input as={InputMask} mask={'(99) 99999-9999'} placeholder='Telefone' type='tel' {...props.register('phone')} />
              <span style={{ color: 'red' }}>{props.errors?.phone?.message}</span>
            </VStack>
            <VStack sx={styles.inputContainer}>
              <Input placeholder='Idade' type='number'  {...props.register('age')} />
              <span style={{ color: 'red' }}>{props.errors?.age?.message}</span>
            </VStack>
            <Button type='submit' bgColor={'green.600'} color={'white'} _hover={{}} w={'full'}>{props.type === 'create' ? 'Adicionar usuário' : 'Editar usuário'}</Button>
          </VStack>
        </form>
      </VStack>
    )
  }

  return (
    <VStack sx={styles.container} >
      <Heading sx={styles.heading}>
        {props.title}
      </Heading>
      <VStack sx={styles.formContainer}>
        <VStack sx={styles.inputContainer}>
          <Input value={props.defaultValues?.name} isDisabled />
        </VStack>
        <VStack sx={styles.inputContainer}>
          <Input placeholder='Email' type='email' value={props.defaultValues?.email} isDisabled />
        </VStack>
        <VStack sx={styles.inputContainer}>
          <Select value={props.defaultValues?.userType} isDisabled>
            <option value='Administrador'>Administrador</option>
            <option value='Usuário Comum'>Usuário Comum</option>
          </Select>
        </VStack >
        <VStack sx={styles.inputContainer}>
          <Input as={InputMask} mask={'(99) 99999-9999'} type='tel' value={props.defaultValues?.phone || '00 00000 0000'} isDisabled />
        </VStack>
        <VStack sx={styles.inputContainer}>
          <Input type='number' value={props.defaultValues?.age || 'Não informado'} isDisabled />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default FormBody
