import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import FormBody from '../components/form';
import { user } from '../types/user';
import { useQuery } from '@tanstack/react-query';
import { getUniqueUser } from '../services/http/requests';
import { toast } from 'react-toastify';
import { API_DEFAULT_ERROR } from '../config/constants';

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

  const { data: user } = useQuery({
    queryFn: () => getUniqueUser(String(id)),
    queryKey: ['user', id],
    onError: () => {
      toast.error(API_DEFAULT_ERROR)
    }
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
