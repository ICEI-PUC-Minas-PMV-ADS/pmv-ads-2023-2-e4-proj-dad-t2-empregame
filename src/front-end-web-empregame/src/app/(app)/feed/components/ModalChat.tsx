import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'

const ModalChat = (props: { refetch: () => void }) => {
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
        Modal Chat Teste
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} gap={'15px'} color={'#5A2DA4'}>
            <Image src={'../../icons/icon-chat.svg'} alt="icone chat" />
            <Box>
              <Text color={'#5A2DA4'} fontWeight={'bold'} fontSize={'20px'}>
                Vaga de Dev FrontEnd React Junior
              </Text>
              <Text color={'#606060'} fontWeight={'regular'} fontSize={'16px'}>
                Conversando com Thiago Terra
              </Text>
            </Box>
          </ModalHeader>
          <ModalBody paddingBottom={'20px'}>
            <Flex gap={'10px'}>
              <Input
                rounded={'full'}
                border={'1px'}
                borderColor={'#2E2E2E'}
                placeholder={'Digite aqui'}
              ></Input>
              <Button
                rounded={'full'}
                bg={'#5A2DA4'}
                py={'10px'}
                px={'25px'}
                color={'white'}
                fontSize={'16px'}
                fontWeight={'regular'}
                _hover={{ boxShadow: 'lg' }}
              >
                Enviar
              </Button>
            </Flex>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalChat
