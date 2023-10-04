import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import FormBody from '../components/form';
import { request } from '../lib/http';
import { user } from '../types/user';
import { useQuery } from '@tanstack/react-query';

const styles: Record<string, SystemStyleObject> = {
  container: {
    height: 'calc(100vh)',
    bg: 'ghostwhite',
    flexDir: 'column',
    placeItems: 'center',
    gap: '40',
    paddingX: { lg: '24', xl: '80' }
  }
}


const Visualize = () => {

  const { id } = useParams()

  const fetchuser = async () => {
    const { data } = await request.get<user[]>(`/user?id=${id}`)
    return data.at(0)
  }

  const { data: user } = useQuery({
    queryFn: fetchuser,
    queryKey: ['user']
  })

  return (
    <VStack sx={styles.container}>
      <Navbar />
      <FormBody
        type='visualize'
        title='Informações do usuário'
        defaultValues={user as user}
      />
    </VStack>
  )
}

export default Visualize
