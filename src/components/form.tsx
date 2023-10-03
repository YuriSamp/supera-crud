import { Button, Heading, Input, Select, VStack } from '@chakra-ui/react'
import InputMask from 'react-input-mask';

const form = ({ register, errors, onSubmit }: any) => {
  return (
    <VStack flexDir={'column'} gap={4} borderWidth={1} borderColor={'black'} padding={6} rounded={'md'} className='brutalism-box'>
      <Heading fontSize={26}>
        Criar novo usuário
      </Heading>
      <form onSubmit={onSubmit} >
        <VStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input placeholder='Nome'  {...register('nome')} />
            <span style={{ color: 'red' }}>{errors.nome?.message}</span>
          </VStack>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input placeholder='Email' type='email' {...register('email')} />
            <span style={{ color: 'red' }}>{errors.email?.message}</span>
          </VStack>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Select placeholder='Selecione o perfil' {...register('perfil')} >
              <option value='Administrador'>Administrador</option>
              <option value='Usuário Comum'>Usuário Comum</option>
            </Select>
            <span style={{ color: 'red' }}>{errors.perfil?.message}</span>
          </VStack >
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input as={InputMask} mask={'(99) 99999-9999'} placeholder='Telefone' type='tel' {...register('telefone')} />
            <span style={{ color: 'red' }}>{errors.telefone?.message}</span>
          </VStack>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input placeholder='Idade' type='number'  {...register('idade')} />
            <span style={{ color: 'red' }}>{errors.idade?.message}</span>
          </VStack>
          <Button type='submit' bgColor={'purple.600'} color={'white'} _hover={{}} w={'full'}>Adicionar usuário</Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default form
