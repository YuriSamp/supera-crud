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

  return (
    <HStack sx={styles.container}>
      <Navbar />
      <DataTable
        data={users}
        page={page}
        setPage={setPage}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </HStack>
  )
}

export default Home
