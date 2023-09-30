import { useEffect, useState } from 'react'
import { HStack } from '@chakra-ui/react'
import DataTable from '../components/table'
import { userData } from '../lib/schema/form'
import { useQuery } from '@tanstack/react-query'
import { request } from '../lib/http'
import Navbar from '../components/navbar'

const Home = () => {
  const [users, setUsers] = useState<userData[]>([])

  const getusers = async () => {
    const { data: users } = await request.get<userData[]>('http://localhost:3000/user')
    return users
  }

  const { data, error } = useQuery({ queryKey: ['user'], queryFn: getusers })

  useEffect(() => {
    if (error || !data) {
      return
    }
    setUsers(data)
  }, [data, error])

  return (
    <HStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} placeItems={'initial'} gap={40} paddingX={'96'}>
      <Navbar />
      <DataTable data={users} />
    </HStack>
  )
}

export default Home
