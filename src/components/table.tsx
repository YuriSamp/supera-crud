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
  SystemStyleObject,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'
import dataDb from '../data/db.json'
import { user } from '../types/user'
import { ROW_COUNT } from '../config/constants'

export interface TableProps {
  data: readonly user[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
  setId: Dispatch<SetStateAction<string>>
  onOpen: () => void
}

const styles: Record<string, SystemStyleObject> = {
  tableContainer: {
    w: 'full',
    borderWidth: 1,
    rounded: 'md',
    padding: 4,
    borderColor: 'black'
  },
  tableFooterContainer: {
    paddingY: 4,
    width: 'full',
    justifyContent: 'end',
    paddingRight: 10
  },
}

const DataTable = ({ data, setPage, page, onOpen, setId }: TableProps) => {

  const numberOfPage = Math.ceil(dataDb.user.length / ROW_COUNT)

  const onDelete = (id: string) => {
    setId(id || '0')
    onOpen()
  }

  const menuItens = (item: user) => [
    { to: `/visualize/${item.id}`, label: 'Visualizar', onClick: undefined },
    { to: `/edit/${item.id}`, label: 'Editar', onClick: undefined },
    { to: null, label: 'Excluir', onClick: () => onDelete(String(item.id)), }
  ]

  return (
    <TableContainer sx={styles.tableContainer}>
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
          {data.map(item => (
            <Tr key={item.id}>
              <Td>{item.id && Number(item.id) + 1}</Td>
              <Td>{item.name}</Td>
              <Td >{item.email}</Td>
              <Td >{item.userType}</Td>
              <Td >{item.age}</Td>
              <Td >
                <Menu>
                  <MenuButton  >
                    <MoreHorizontal />
                  </MenuButton>
                  <MenuList  >
                    {menuItens(item).map(menuItem => (
                      <MenuItem onClick={menuItem.onClick}>
                        {menuItem.to ?
                          <Link to={menuItem.to}>
                            {menuItem.label}
                          </Link>
                          :
                          menuItem.label
                        }
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack sx={styles.tableFooterContainer}  >
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
