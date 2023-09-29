
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { userData } from '../App'

export interface TableProps {
  data: userData[]
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
            <Tr>
              <Td>{item.identificador}</Td>
              <Td>{item.nome}</Td>
              <Td >{item.email}</Td>
              <Td >{item.perfil}</Td>
              <Td >{item.idade}</Td>
              <Td >Ações</Td>
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
