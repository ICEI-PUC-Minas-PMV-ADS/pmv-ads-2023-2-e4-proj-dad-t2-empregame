import { ButtonPrimary } from '@/components/button-primary'
import { InputForm } from '@/components/input-form'
import InputSelect from '@/components/input-select'
import { IUsuario } from '@/interface/IUsuario'
import { useMutation } from '@/utils/hooks/useMutation'
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Image,
  ModalBody,
  SimpleGrid,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
  ModalFooter,
  Textarea
} from '@chakra-ui/react'
import { useState } from 'react'

const ModalEditarVaga = (props: { refetch: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [nomeVaga, setNomeVaga] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [beneficios, setBeneficios] = useState<string>('')
  const [empresa, setEmpresa] = useState<string>('')
  const [estadoEmpresa, setEstadoEmpresa] = useState<string>('')
  const [cidadeEmpresa, setCidadeEmpresa] = useState<string>('')
  const [salario, setSalario] = useState<string>('')
  const [hardskill, setHardskill] = useState<string>('')
  const [listHardskill, setListHardskill] = useState<
    {
      id: number
      nome: string
    }[]
  >([])

  const [softskill, setSoftskill] = useState<string>('')
  const [listSoftskill, setListSoftskill] = useState<
    {
      id: number
      nome: string
    }[]
  >([])

  const adicionarHardskill = (hardskill: { id: number; nome: string }) => {
    setListHardskill((old) => [...old, hardskill])
  }

  const adicionarSoftskill = (softskill: { id: number; nome: string }) => {
    setListSoftskill((old) => [...old, softskill])
  }

  const {
    mutate: mutateAtualizarUsuarioHardskills,
    isFetching: isFetchingAtualizarUsuarioHardskills
  } = useMutation<IUsuario>('/usuarios/hardskills', {
    method: 'PATCH',
    onSuccess: ({ data }) => {},
    onError: (err) => {}
  })

  const {
    mutate: mutateAtualizarUsuario,
    isFetching: isFetchingAtualizarUsuario
  } = useMutation<IUsuario>('/usuarios', {
    method: 'PATCH',
    onSuccess: () => {
      props.refetch()
      toast({ title: 'Dados atualizado com sucesso!', status: 'success' })
      onClose()
    },
    onError: (err) => {
      toast({ title: err.message, status: 'error' })
    }
  })

  const editarVaga = () => {}

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
        Publicar Vaga
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} gap={'15px'} color={'#5A2DA4'}>
            <Image
              src={'../../icons/icon-editar.svg'}
              alt="icone editar vaga"
            />
            Editar Vaga
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={'15px'} direction={'column'}>
              <InputForm
                type="text"
                placeholder="Nome da Vaga *"
                onChange={(e) => setNomeVaga(e.target.value)}
              />
              <Textarea
                borderRadius={'14px'}
                placeholder="Descrição *"
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Textarea
                borderRadius={'14px'}
                placeholder="Benefícios"
                onChange={(e) => setBeneficios(e.target.value)}
              />
              <SimpleGrid columns={2} spacingY={'16px'} spacingX={'30px'}>
                <InputForm
                  type="text"
                  placeholder="Empresa *"
                  onChange={(e) => setEmpresa(e.target.value)}
                />
                <InputForm
                  type="text"
                  placeholder="Salário *"
                  onChange={(e) => setSalario(e.target.value)}
                />
                <InputSelect
                  placeholder="Estado *"
                  onChange={(e) => setEstadoEmpresa(e.target.value)}
                >
                  <option>Teste</option>
                </InputSelect>
                <InputSelect
                  placeholder="Cidade *"
                  onChange={(e) => setCidadeEmpresa(e.target.value)}
                >
                  <option>Teste</option>
                </InputSelect>
              </SimpleGrid>

              <>
                <Flex direction={'column'} gap={'12px'}>
                  <InputGroup>
                    <InputForm
                      type="text"
                      placeholder="Hardskills"
                      onChange={(e) => setHardskill(e.target.value)}
                    />
                    <InputRightElement w={'25%'}>
                      <Button
                        onClick={() =>
                          adicionarHardskill({
                            id: Math.random() * 100,
                            nome: hardskill
                          })
                        }
                        bg={'none'}
                        rounded={'full'}
                        h={'30px'}
                        color={'#2E2E2E'}
                      >
                        <Image
                          src="../../icons/icon-mais.svg"
                          pr={'10px'}
                          alt="icone mais"
                        />
                        Adicionar
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <SimpleGrid columns={2} gap={'15px'}>
                    {listHardskill.map((hardskill) => (
                      <Flex
                        direction={'column'}
                        bg={'#6D3BBF'}
                        rounded={'12px'}
                        py={'12px'}
                        px={'20px'}
                        key={hardskill.id}
                      >
                        <Flex justifyContent={'space-between'}>
                          <Text
                            fontSize={'16px'}
                            fontWeight={'medium'}
                            color={'white'}
                          >
                            {hardskill.nome}
                          </Text>
                          <Button
                            bg={'none'}
                            _hover={{ bg: '#5A2DA4' }}
                            position={'relative'}
                            top={'-8px'}
                            right={'-15px'}
                            rounded={'full'}
                            maxW={'10px'}
                            onClick={() =>
                              setListHardskill(
                                listHardskill.filter(
                                  (e) => e.id !== hardskill.id
                                )
                              )
                            }
                          >
                            <Image
                              src="../../icons/icon-close.svg"
                              minH={'10px'}
                              minW={'10px'}
                              alt="icone fechar"
                            />
                          </Button>
                        </Flex>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Flex>
                <Flex direction={'column'} gap={'12px'}>
                  <InputGroup>
                    <InputForm
                      type="text"
                      placeholder="Softskills"
                      onChange={(e) => setSoftskill(e.target.value)}
                    />
                    <InputRightElement w={'25%'}>
                      <Button
                        onClick={() =>
                          adicionarSoftskill({
                            id: Math.random() * 100,
                            nome: softskill
                          })
                        }
                        bg={'none'}
                        rounded={'full'}
                        h={'30px'}
                        color={'#2E2E2E'}
                      >
                        <Image
                          src="../../icons/icon-mais.svg"
                          pr={'10px'}
                          alt="icone mais"
                        />
                        Adicionar
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <SimpleGrid columns={2} gap={'15px'}>
                    {listSoftskill.map((softskill) => {
                      return (
                        <Flex
                          direction={'column'}
                          bg={'#6D3BBF'}
                          rounded={'12px'}
                          py={'12px'}
                          px={'20px'}
                          key={softskill.id}
                        >
                          <Flex justifyContent={'space-between'}>
                            <Text
                              fontSize={'16px'}
                              fontWeight={'medium'}
                              color={'white'}
                            >
                              {softskill.nome}
                            </Text>
                            <Button
                              bg={'none'}
                              _hover={{ bg: '#5A2DA4' }}
                              position={'relative'}
                              top={'-8px'}
                              right={'-15px'}
                              rounded={'full'}
                              maxW={'10px'}
                              onClick={() =>
                                setListSoftskill(
                                  listSoftskill.filter(
                                    (e) => e.id !== softskill.id
                                  )
                                )
                              }
                            >
                              <Image
                                alt="icone fechar"
                                src="../../icons/icon-close.svg"
                                minH={'10px'}
                                minW={'10px'}
                              />
                            </Button>
                          </Flex>
                        </Flex>
                      )
                    })}
                  </SimpleGrid>
                </Flex>
              </>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <ButtonPrimary
              onClick={() => editarVaga()}
              buttonText="Salvar"
              loadingText="Salvando"
              isLoading={isFetchingAtualizarUsuario}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalEditarVaga
