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
import { useAtom, useAtomValue } from 'jotai'
import { userAtom, userId } from '../lib/context'
import { request } from '../lib/http'
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void
  isOpen: boolean
}


const DeleteDialog = ({ isOpen, onClose }: Props) => {

  const [userCredentials, setUserCredentials] = useAtom(userAtom)
  const id = useAtomValue(userId)

  const user = userCredentials.filter(user => user.id === id)[0]

  const cancelRef = useRef(null)

  const onDelete = () => {
    request.delete(`/user/${id}`)
    setUserCredentials(userCredentials.filter(user => user.id !== id))
    // setIsOpen(false)
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
