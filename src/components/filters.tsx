import { Button, HStack, Input, SystemStyleObject } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

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

type FilterTypes = {
  name: string
  userType: string
  email: string
}

const Filters = () => {

  const {
    register,
    handleSubmit,
  } = useForm<FilterTypes>()

  const onSubmit = (data: FilterTypes) => {
    console.log(data)
  }


  return (
    <HStack sx={styles.container}>
      <Input placeholder={'Nome'} sx={styles.input}  {...register('name')} />
      <Input placeholder={'Perfil'} sx={styles.input} {...register('userType')} />
      <Input placeholder={'Email'} sx={styles.input} {...register('email')} />
      <Button onClick={handleSubmit(onSubmit)} bgColor={'green.600'} color={'white'} _hover={{}}>Pesquisar</Button>
    </HStack>
  )
}

export default Filters
