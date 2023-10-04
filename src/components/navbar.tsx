import { HStack, Link, Heading, SystemStyleObject } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const RoutesList = [
  { to: '/', label: 'Listagem' },
  { to: '/create', label: 'Cadastro' }
]

const styles: Record<string, SystemStyleObject> = {
  container: {
    justifyContent: 'space-between',
    py: 4,
    borderBottomWidth: 1,
    placeItems: 'center',
    borderColor: 'black',
    w: 'full'
  },
  heading: {
    fontSize: 24
  },
  menu: {
    gap: 6
  }
}

const Navbar = () => {
  return (
    <HStack sx={styles.container}>
      <Heading sx={styles.heading}>Teste Técnico</Heading>
      <HStack sx={styles.menu}>
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
