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
import { userData } from '../lib/schema/form'

export interface TableProps {
  data: readonly userData[]
}

const DataTable = ({ data }: TableProps) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Identificador</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th >Perfil</Th>
            <Th >Idade</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.identificador}>
              <Td>{item.identificador}</Td>
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
                      <Link to={`/visualize/${item.identificador}`}>
                        Visualizar
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/edit/${item.identificador}`}>
                        Editar
                      </Link>
                    </MenuItem>
                    <MenuItem>
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
