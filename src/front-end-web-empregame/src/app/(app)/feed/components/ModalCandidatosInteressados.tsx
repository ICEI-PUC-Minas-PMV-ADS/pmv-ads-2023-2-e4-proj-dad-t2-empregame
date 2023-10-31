import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Button,
  ModalBody,
  Flex
} from '@chakra-ui/react'
import CardCantidatosInteressados from './CardCandidatosInteressados'

const ModalCandidatosInteressados = (props: { refetch: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        onClick={onOpen}
        py={'30px'}
        px={'30px'}
        gap={'15px'}
        borderWidth={'1px'}
        borderColor={'#E1E1E1'}
        rounded={'13px'}
        bg={'white'}
        width={'100%'}
        color={'#6D3BBF'}
        fontSize={'20px'}
        fontWeight={'semibold'}
        _hover={{ boxShadow: 'lg' }}
      >
        <Image src={'../../icons/icon-publicarVaga.svg'} alt={'publicar'} />
        Candidados Interessados Teste
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} gap={'15px'} color={'#5A2DA4'}>
            <Image src={'../../icons/icon-coracao.svg'} alt="icone coracao" />
            Candidatos Interessados
          </ModalHeader>
          <ModalBody>
            <Flex direction={'column'} gap={'10px'}>
              <CardCantidatosInteressados />
              <CardCantidatosInteressados />
              <CardCantidatosInteressados />
            </Flex>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCandidatosInteressados
