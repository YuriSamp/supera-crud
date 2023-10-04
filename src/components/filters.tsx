import { Button, HStack, Input, SystemStyleObject } from '@chakra-ui/react'
import { useState } from 'react'

const styles: Record<string, SystemStyleObject> = {
  container: {
    gap: 3,
    paddingY: 4
  },
  input: {
    borderWidth: 1,
    rounded: 'lg',
    borderColor: 'black',
    w: '40'
  }
}


const Filters = () => {

  const [nome, setNome] = useState('')
  const [perfil, setPerfil] = useState('')
  const [email, setEmail] = useState('')

  const cleanFilter = () => {
    setNome('')
    setPerfil('')
    setEmail('')
  }


  return (
    <HStack sx={styles.container}>
      <Input placeholder={'Nome'} sx={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
      <Input placeholder={'Perfil'} sx={styles.input} value={perfil} onChange={(e) => setPerfil(e.target.value)} />
      <Input placeholder={'Email'} sx={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={cleanFilter} bgColor={'purple.600'} color={'white'} _hover={{}}>Limpar</Button>
    </HStack>
  )
}

export default Filters
