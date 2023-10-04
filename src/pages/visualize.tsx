import { SystemStyleObject, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { userAtom } from '../lib/context';
import Navbar from '../components/navbar';
import FormBody from '../components/form';

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

  const users = useAtomValue(userAtom)
  const { id } = useParams()
  const user = users.filter(user => user.id === id)[0]

  return (
    <VStack sx={styles.container}>
      <Navbar />
      <FormBody
        type='visualize'
        title='Informações do usuário'
        defaultValues={user}
      />
    </VStack>
  )
}

export default Visualize
