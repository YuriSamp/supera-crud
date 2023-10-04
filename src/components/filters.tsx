import { Button, HStack, Input, SystemStyleObject } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { user } from '../types/user'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getFilteredusers } from '../services/http/requests'

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

export type FilterTypes = {
  name: string
  userType: string
  email: string
}

interface Props {
  setUsers: Dispatch<SetStateAction<user[]>>
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<user[], unknown>>
}

const Filters = ({ setUsers, refetch }: Props) => {

  const {
    register,
    handleSubmit,
    setValue
  } = useForm<FilterTypes>()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: getFilteredusers,
    onSuccess: (data: user[]) => {
      setUsers(data)
    },
    onError: () => {
      toast.error('Algo deu errado, tente novamente')
    }
  })

  const onSubmit = (data: FilterTypes) => {
    mutation.mutate(data)
  }

  const onCleanFilter = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
    refetch()
    setValue('name', '')
    setValue('email', '')
    setValue('userType', '')
  }


  return (
    <HStack sx={styles.container}>
      <Input placeholder={'Nome'} sx={styles.input}  {...register('name')} />
      <Input placeholder={'Perfil'} sx={styles.input} {...register('userType')} />
      <Input placeholder={'Email'} sx={styles.input} {...register('email')} />
      <Button onClick={onCleanFilter} bgColor={'green.600'} color={'white'} _hover={{}}>Limpar filtros</Button>
      <Button onClick={handleSubmit(onSubmit)} bgColor={'green.600'} color={'white'} _hover={{}}>Pesquisar</Button>
    </HStack>
  )
}

export default Filters
