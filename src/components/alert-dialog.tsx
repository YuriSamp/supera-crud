import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  SystemStyleObject,
} from '@chakra-ui/react'
import { request } from '../lib/http'
import { toast } from 'react-toastify';
import { user } from '../types/user'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'

type Refetch = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<user[], unknown>>

interface Props {
  user: user
  onClose: () => void
  isOpen: boolean
  id: string
  refetch: Refetch
}

const styles: Record<string, SystemStyleObject> = {
  header: {
    fontSize: 'lg',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    _hover: {}
  }
}

const DeleteDialog = ({ isOpen, onClose, id, user, refetch }: Props) => {

  const cancelRef = useRef(null)
  const queryClient = useQueryClient()

  const removeUser = async (id: string) => {
    request.delete(`/user/${id}`)
  }

  const mutation = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      toast.success('O usuário foi deletado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      refetch()
      onClose()
    },
    onError: () => {
      toast.error('Algo deu errado tente novamente')
    }
  },)

  const onDelete = () => {
    mutation.mutate(id)
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader sx={styles.header}>
            Deletar {user?.name}
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza? Essa ação não poderá ser desfeita.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button sx={styles.button} onClick={onDelete} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteDialog
