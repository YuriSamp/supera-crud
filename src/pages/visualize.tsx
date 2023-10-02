import { Heading, Input, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { userAtom } from '../lib/context';
import Navbar from '../components/navbar';

const Visualize = () => {

  const users = useAtomValue(userAtom)
  const { id } = useParams()
  const user = users.filter(user => user.id === id)[0]

  return (
    <VStack height='calc(100vh)' bg={'ghostwhite'} flexDir={'column'} placeItems={'center'} gap={40} paddingX={'96'}>
      <Navbar />
      <VStack flexDir={'column'} gap={4} borderWidth={1} borderColor={'black'} padding={6} rounded={'md'} className='brutalism-box'>
        <Heading fontSize={26}>
          Informações do usuário
        </Heading>
        <VStack flexDir={'column'} justifyContent={'center'} placeItems={'center'} gap={'3'}>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input value={user.nome} />
          </VStack>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input value={user.email} />
          </VStack>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input value={user.perfil} />
          </VStack >
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input value={user.telefone?.length ? user.telefone : 'Não informado'} />
          </VStack>
          <VStack flexDir={'column'} gap={'2'} w={330}>
            <Input value={user.idade ? user.idade : 'Não informado'} />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Visualize
