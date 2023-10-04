import { HStack, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const RoutesList = [
  { to: '/', label: 'Listagem' },
  { to: '/create', label: 'Cadastro' }
]

const Navbar = () => {
  return (
    <HStack justifyContent={'space-between'} py={4} borderBottomWidth={1} placeItems={'center'} borderColor={'black'} w={'full'}>
      <Heading fontSize={24}>Teste Técnico</Heading>
      <HStack gap={6}>
        {RoutesList.map(route => (
          <Link key={route.to} as={RouterLink} to={route.to}>
            {route.label}
          </Link>
        ))}
      </HStack>
    </HStack>
  )
}

export default Navbar
