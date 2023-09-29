import { useState } from 'react'
import { HStack } from '@chakra-ui/react'
import DataTable from '../components/table'

export interface userData {
  identificador: string
  nome: string
  email: string
  perfil: string
  idade: number
}

const mockData = [
  {
    "identificador": "1",
    "nome": "João",
    "email": "joao@email.com",
    "perfil": "Usuário",
    "idade": 30
  },
  {
    "identificador": "2",
    "nome": "Maria",
    "email": "maria@email.com",
    "perfil": "Admin",
    "idade": 35
  },
  {
    "identificador": "3",
    "nome": "Carlos",
    "email": "carlos@email.com",
    "perfil": "Usuário",
    "idade": 25
  },
  {
    "identificador": "4",
    "nome": "Ana",
    "email": "ana@email.com",
    "perfil": "Moderador",
    "idade": 28
  },
  {
    "identificador": "5",
    "nome": "Pedro",
    "email": "pedro@email.com",
    "perfil": "Usuário",
    "idade": 22
  }
]


const Home = () => {
  const [data,] = useState(mockData)

  return (
    <HStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} justifyContent={'center'} placeItems={'initial'} paddingX={'96'}>
      <DataTable data={data} />
    </HStack>
  )
}

export default Home
