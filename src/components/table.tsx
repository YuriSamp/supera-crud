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
  SystemStyleObject,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction, useState } from 'react'
import dataDb from '../data/db.json'
import { user } from '../types/user'
import { ROW_COUNT } from '../config/constants'
import DeleteDialog from './alert-dialog'

export interface TableProps {
  data: readonly user[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
}

const styles: Record<string, SystemStyleObject> = {
  tableHeaderContainer: {
    gap: 3,
    paddingY: 4
  },
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
  input: {
    borderWidth: 1,
    rounded: 'lg',
    borderColor: 'black',
    w: '40'
  }
}

const DataTable = ({ data, setPage, page, onOpen, isOpen, onClose }: TableProps) => {

  const [nome, setNome] = useState('')
  const [perfil, setPerfil] = useState('')
  const [email, setEmail] = useState('')

  const [id, setId] = useState('')

  const filteredData = data.filter(entry =>
    entry.nome.toLowerCase().includes(nome.toLowerCase())
    && entry.perfil.toLowerCase().includes(perfil.toLowerCase())
    && entry.email.toLowerCase().includes(email.toLowerCase()))

  const numberOfPage = Math.ceil(dataDb.user.length / ROW_COUNT)
  const user = data.filter(user => user.id === id)[0]

  const cleanFilter = () => {
    setNome('')
    setPerfil('')
    setEmail('')
  }

  return (
    <>
      <TableContainer sx={styles.tableContainer}>
        <HStack sx={styles.tableHeaderContainer}>
          <Input placeholder={'Nome'} sx={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
          <Input placeholder={'Perfil'} sx={styles.input} value={perfil} onChange={(e) => setPerfil(e.target.value)} />
          <Input placeholder={'Email'} sx={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        onOpen()
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
      <DeleteDialog
        user={user}
        isOpen={isOpen}
        onClose={onClose}
        id={id}
      />
    </>
  )
}

export default DataTable
