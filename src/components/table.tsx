import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Input,
  Button,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { deleteModalAtom, userId } from '../lib/context'
import { Dispatch, SetStateAction, useState } from 'react'
import dataDb from '../data/db.json'
import { user } from '../types/user'
import { ROW_COUNT } from '../config/constants'

export interface TableProps {
  data: readonly user[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const DataTable = ({ data, setPage, page }: TableProps) => {

  const setId = useSetAtom(userId)
  const setIsOpen = useSetAtom(deleteModalAtom)

  const [nome, setNome] = useState('')
  const [perfil, setPerfil] = useState('')
  const [email, setEmail] = useState('')

  const filteredData = data.filter(entry =>
    entry.nome.toLowerCase().includes(nome.toLowerCase())
    && entry.perfil.toLowerCase().includes(perfil.toLowerCase())
    && entry.email.toLowerCase().includes(email.toLowerCase()))

  const numberOfPage = Math.ceil(dataDb.user.length / ROW_COUNT)

  const cleanFilter = () => {
    setNome('')
    setPerfil('')
    setEmail('')
  }

  return (
    <TableContainer w={'full'} borderWidth={1} rounded={'md'} padding={4} borderColor={'black'}>
      <HStack gap={3} paddingY={4}>
        <Input placeholder={'Nome'} borderWidth={1} rounded={'lg'} borderColor={'black'} w={'40'} value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input placeholder={'Perfil'} borderWidth={1} rounded={'lg'} borderColor={'black'} w={'40'} value={perfil} onChange={(e) => setPerfil(e.target.value)} />
        <Input placeholder={'Email'} borderWidth={1} rounded={'lg'} borderColor={'black'} w={'40'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={cleanFilter} bgColor={'purple.600'} color={'white'} _hover={{}}>Limpar</Button>
      </HStack>
      <Table variant='simple' w={'full'}>
        <Thead>
          <Tr>
            <Th>identificador</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th >Perfil</Th>
            <Th >Idade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map(item => (
            <Tr key={item.id}>
              <Td>{item.id && Number(item.id) + 1}</Td>
              <Td>{item.nome}</Td>
              <Td >{item.email}</Td>
              <Td >{item.perfil}</Td>
              <Td >{item.idade}</Td>
              <Td >
                <Menu>
                  <MenuButton  >
                    <MoreHorizontal />
                  </MenuButton>
                  <MenuList  >
                    <MenuItem>
                      <Link to={`/visualize/${item.id}`}>
                        Visualizar
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/edit/${item.id}`}>
                        Editar
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => {
                      setId(item.id || '0')
                      setIsOpen(true)
                    }}>
                      Excluir
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack paddingY={4} width={'full'} justifyContent={'end'} paddingRight={10}  >
        <HStack>
          <span>Pagina {page} de {numberOfPage} </span>
        </HStack>
        <HStack>
          <ChevronLeft style={{ cursor: 'pointer' }} onClick={() => setPage(old => Math.max(old - 1, 1))} />
          <ChevronRight style={{ cursor: 'pointer' }} onClick={() => page < numberOfPage && setPage(old => old + 1)} />
        </HStack>
      </HStack>
    </TableContainer>
  )
}

export default DataTable
