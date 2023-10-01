import { HStack, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <HStack justifyContent={'space-between'} py={4} borderBottomWidth={1} placeItems={'center'} borderColor={'black'} w={'full'}>
      <Heading fontSize={24}>Teste Técnico</Heading>
      <HStack gap={6}>
        <Link as={RouterLink} to={'/'}>
          Listagem
        </Link>
        <Link as={RouterLink} to={'/create'}>
          Cadastro
        </Link>
      </HStack>
    </HStack>
  )
}

export default Navbar
