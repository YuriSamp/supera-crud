import { HStack, Heading, Input, Button, Select } from '@chakra-ui/react'

const Visualize = () => {
  return (
    <HStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} justifyContent={'center'} placeItems={'center'} paddingX={'96'}>
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
        <Button type='submit' >Adicionar usuário</Button>
      </HStack>

    </HStack>
  )
}

export default Visualize
