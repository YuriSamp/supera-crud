import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { request } from '../lib/http'
import { toast } from 'react-toastify';
import { user } from '../types/user'

interface Props {
  userCredentials: readonly user[]
  onClose: () => void
  isOpen: boolean
  id: string
}

const DeleteDialog = ({ isOpen, onClose, id, userCredentials }: Props) => {

  const user = userCredentials.filter(user => user.id === id)[0]

  const cancelRef = useRef(null)

  const onDelete = () => {
    request.delete(`/user/${id}`)
    toast.success('O usuário foi deletado com sucesso')
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Deletar {user?.nome}
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza? Essa ação não poderá ser desfeita.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' onClick={onDelete} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteDialog
