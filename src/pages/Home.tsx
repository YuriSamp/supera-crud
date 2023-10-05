import { useState } from 'react'
import { SystemStyleObject, VStack, Spinner } from '@chakra-ui/react'
import DataTable from '../components/table'
import { useQuery } from '@tanstack/react-query'
import Navbar from '../components/navbar'
import { user } from '../types/user'
import { useDisclosure } from '@chakra-ui/react'
import DeleteDialog from '../components/alert-dialog'
import Filters from '../components/filters'
import { toast } from 'react-toastify'
import { getAllUsers } from '../services/http/requests'
import { API_DEFAULT_ERROR } from '../config/constants'


const styles: Record<string, SystemStyleObject> = {
  container: {
    height: 'calc(100vh)',
    bg: 'ghostwhite',
    flexDir: 'column',
    placeItems: 'initial',
    gap: 28,
    paddingX: { base: '24', xl: '48', '2xl': '80' }
  }
}

const Home = () => {
  const [users, setUsers] = useState<user[]>([])
  const [page, setPage] = useState(1)
  const [id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isFiltered, setIsFiltered] = useState(false)

  const { isLoading, refetch } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getAllUsers(page),
    onError: () => {
      toast.error(API_DEFAULT_ERROR)
    },
    onSuccess: (userList: user[]) => {
      setUsers(userList)
    }
  })

  const user = users.filter(user => user.id === id)[0]

  return (
    <VStack sx={styles.container}>
      <Navbar />
      <VStack gap={isLoading ? 20 : 0}>
        <Filters setUsers={setUsers} refetch={refetch} setIsFiltered={setIsFiltered} />
        {isLoading ? < Spinner /> :
          <DataTable
            data={users}
            page={page}
            setPage={setPage}
            onOpen={onOpen}
            setId={setId}
            isFiltered={isFiltered}
          />
        }
      </VStack>
      <DeleteDialog
        user={user}
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        refetch={refetch}
      />
    </VStack>
  )
}

export default Home
