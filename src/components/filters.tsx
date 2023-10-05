import { Button, HStack, Input, SystemStyleObject } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { user } from '../types/user'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getFilteredusers } from '../services/http/requests'
import { API_DEFAULT_ERROR } from '../config/constants'

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
  setIsFiltered: Dispatch<SetStateAction<boolean>>
}

const Filters = ({ setUsers, refetch, setIsFiltered }: Props) => {

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
      setIsFiltered(true)
    },
    onError: () => {
      toast.error(API_DEFAULT_ERROR)
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
    setIsFiltered(false)
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
