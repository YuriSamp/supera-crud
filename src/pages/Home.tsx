import { useEffect, useState } from 'react'
import { HStack, SystemStyleObject } from '@chakra-ui/react'
import DataTable from '../components/table'
import { useQuery } from '@tanstack/react-query'
import { request } from '../lib/http'
import Navbar from '../components/navbar'
import { useAtom } from 'jotai'
import { userAtom } from '../lib/context'
import { user } from '../types/user'
import { useDisclosure } from '@chakra-ui/react'
import DeleteDialog from '../components/alert-dialog'

const styles: Record<string, SystemStyleObject> = {
  container: {
    height: 'calc(100vh)',
    bg: 'ghostwhite',
    flexDir: 'column',
    placeItems: 'initial',
    gap: '40',
    paddingX: { base: '24', xl: '48', '2xl': '80' }
  }
}

const Home = () => {
  const [users, setUsers] = useAtom(userAtom)
  const [page, setPage] = useState(1)
  const [id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()


  const getusers = async () => {
    const { data: users } = await request.get<user[]>(`/user?_page=${page}&_limit=5`)
    return users
  }

  const { data: userList, error } = useQuery({ queryKey: ['user', page], queryFn: getusers })

  useEffect(() => {
    if (error || !userList) {
      return
    }
    setUsers(userList)
  }, [userList, error, setUsers])

  const user = users.filter(user => user.id === id)[0]

  return (
    <HStack sx={styles.container}>
      <Navbar />
      <DataTable
        data={users}
        page={page}
        setPage={setPage}
        onOpen={onOpen}
        setId={setId}
      />
      <DeleteDialog
        user={user}
        isOpen={isOpen}
        onClose={onClose}
        id={id}
      />
    </HStack>
  )
}

export default Home
