import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
} from '@chakra-ui/react'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { user } from '../lib/schema/form'
import { useSetAtom } from 'jotai'
import { deleteModalAtom, userId } from '../lib/context'
import { useState } from 'react'

export interface TableProps {
  data: readonly user[]
}

const DataTable = ({ data }: TableProps) => {

  const setId = useSetAtom(userId)
  const setIsOpen = useSetAtom(deleteModalAtom)

  const [nome, setNome] = useState('')
  const [perfil, setPerfil] = useState('')
  const [email, setEmail] = useState('')


  const filteredData = data.filter(entry =>
    entry.nome.toLowerCase().includes(nome.toLowerCase())
    && entry.perfil.toLowerCase().includes(perfil.toLowerCase())
    && entry.email.toLowerCase().includes(email.toLowerCase()))

  return (
    <TableContainer w={'full'}>
      <HStack>
        <Input placeholder={'nome'} borderWidth={1} rounded={'lg'} borderColor={'black'} w={'96'} onChange={(e) => setNome(e.target.value)} />
        <Input placeholder={'perfil'} borderWidth={1} rounded={'lg'} borderColor={'black'} w={'96'} onChange={(e) => setPerfil(e.target.value)} />
        <Input placeholder={'email'} borderWidth={1} rounded={'lg'} borderColor={'black'} w={'96'} onChange={(e) => setEmail(e.target.value)} />
      </HStack>
      <Table variant='simple'>
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
              <Td>{item.id}</Td>
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
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default DataTable
