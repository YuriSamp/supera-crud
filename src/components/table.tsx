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
} from '@chakra-ui/react'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { user } from '../lib/schema/form'
import { useSetAtom } from 'jotai'
import { deleteModalAtom, userId } from '../lib/context'

export interface TableProps {
  data: readonly user[]
}

const DataTable = ({ data }: TableProps) => {

  const setId = useSetAtom(userId)
  const setIsOpen = useSetAtom(deleteModalAtom)

  return (
    <TableContainer w={'full'}>
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
          {data.map(item => (
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
