import { ButtonPrimary } from "@/components/button-primary";
import { InputForm } from "@/components/input-form";
import InputSelect from "@/components/input-select";
import { IVaga, IVagaHardSkill, IVagaSoftSkill } from "@/interface/IVaga";
import { useFetch } from "@/utils/hooks/useFetch";
import { useMutation } from "@/utils/hooks/useMutation";
import { numberToBRL } from "@/utils/regex/numberToBRL";
import { api } from "@/utils/services/api";
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
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalPublicarVaga = (props: { refetch: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [nomeVaga, setNomeVaga] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [beneficios, setBeneficios] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [estadoEmpresa, setEstadoEmpresa] = useState<string>("");
  const [cidadeEmpresa, setCidadeEmpresa] = useState<string>("");
  const [salario, setSalario] = useState<string>("");
  const [hardskill, setHardskill] = useState<string>("");
  const [listHardskill, setListHardskill] = useState<
    {
      id: number;
      nome: string;
    }[]
  >([]);

  const [softskill, setSoftskill] = useState<string>("");
  const [listSoftskill, setListSoftskill] = useState<
    {
      id: number;
      nome: string;
    }[]
  >([]);

  const adicionarHardskill = (hardskill: { id: number; nome: string }) => {
    setListHardskill((old) => [...old, hardskill]);
  };

  const adicionarSoftskill = (softskill: { id: number; nome: string }) => {
    setListSoftskill((old) => [...old, softskill]);
  };

  const { data: estados } = useFetch<
    {
      id: string;
      sigla: string;
      nome: string;
    }[]
  >("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");

  const idEstado = estados?.find((e) => e.nome === estadoEmpresa);

  const { data: cidades } = useFetch<
    {
      id: number;
      nome: string;
    }[]
  >(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado?.id}/municipios`,
    { enable: !!idEstado, itensRefresh: [idEstado] }
  );

  const {
    mutate: mutateCriarVagaHardSkill,
    isFetching: isFetchingCriarVagaHardSkill,
  } = useMutation<IVagaHardSkill>("/vagas/hardskills", { method: "POST" });

  const {
    mutate: mutateCriarVagaSoftSkill,
    isFetching: isFetchingCriarVagaSoftSkill,
  } = useMutation<IVagaSoftSkill>("/vagas/softskills", { method: "POST" });

  const { mutate: mutateCriarVaga, isFetching: isFetchingCriarVaga } =
    useMutation<IVaga, { id: number }>("/vagas", {
      method: "POST",
      onSuccess: async (data) => {
        const idVaga = data.data.id;
        await listHardskill.map((hardskill) => {
          api
            .post("/hardskills", {
              nome: hardskill.nome,
            })
            .then((data: { data: { id: number } }) => {
              const idHardskill = data.data.id;
              mutateCriarVagaHardSkill({
                id_vaga: idVaga,
                id_hardskill: idHardskill,
              });
            });
        });
        await listSoftskill.map((softskill) => {
          api
            .post("/softskills", {
              nome: softskill.nome,
            })
            .then((data: { data: { id: number } }) => {
              const idSoftskill = data.data.id;
              mutateCriarVagaSoftSkill({
                id_vaga: idVaga,
                id_softskill: idSoftskill,
              });
            });
        });
        props.refetch();
        toast({ title: "Vaga publicada com sucesso!", status: "success" });
        onClose();
      },
      onError: (err) => {
        toast({ title: err.message, status: "error" });
      },
    });

  const publicarVaga = () => {
    mutateCriarVaga({
      nome: nomeVaga,
      descricao: descricao,
      salario: salario,
      beneficios: beneficios,
      empresa_nome: empresa,
      empresa_cidade: cidadeEmpresa,
      empresa_estado: estadoEmpresa,
      situacao: "ATIVO",
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        py={"30px"}
        px={"30px"}
        gap={"15px"}
        borderWidth={"1px"}
        borderColor={"#E1E1E1"}
        rounded={"13px"}
        bg={"white"}
        width={"100%"}
        color={"#6D3BBF"}
        fontSize={"20px"}
        fontWeight={"semibold"}
        _hover={{ boxShadow: "lg" }}
      >
        <Image src={"../../icons/icon-publicarVaga.svg"} alt={"publicar"} />
        Publicar Vaga
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} gap={"15px"} color={"#5A2DA4"}>
            <Image
              src={"../../icons/icon-publicarVaga.svg"}
              alt="icone publicar vaga"
            />
            Publicar Vaga
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"15px"} direction={"column"}>
              <InputForm
                type="text"
                placeholder="Nome da Vaga *"
                onChange={(e) => setNomeVaga(e.target.value)}
              />
              <Textarea
                borderRadius={"14px"}
                placeholder="Descrição *"
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Textarea
                borderRadius={"14px"}
                placeholder="Benefícios"
                onChange={(e) => setBeneficios(e.target.value)}
              />
              <SimpleGrid columns={2} spacingY={"16px"} spacingX={"30px"}>
                <InputForm
                  type="text"
                  placeholder="Empresa *"
                  onChange={(e) => setEmpresa(e.target.value)}
                />
                <InputForm
                  type="text"
                  placeholder="Salário *"
                  value={salario}
                  onChange={(e) => setSalario(numberToBRL(e.target.value))}
                />
                <InputSelect
                  placeholder="Estado *"
                  onChange={(e) => setEstadoEmpresa(e.target.value)}
                >
                  {estados &&
                    estados.map((e) => (
                      <option key={e.id} value={e.nome}>
                        {e.nome}
                      </option>
                    ))}
                </InputSelect>
                <InputSelect
                  placeholder="Cidade *"
                  onChange={(e) => setCidadeEmpresa(e.target.value)}
                >
                  {cidades &&
                    cidades.map((c) => (
                      <option key={c.id} value={c.nome}>
                        {c.nome}
                      </option>
                    ))}
                </InputSelect>
              </SimpleGrid>

              <>
                <Flex direction={"column"} gap={"12px"}>
                  <InputGroup>
                    <InputForm
                      type="text"
                      placeholder="Hardskills"
                      onChange={(e) => setHardskill(e.target.value)}
                    />
                    <InputRightElement w={"25%"}>
                      <Button
                        onClick={() =>
                          adicionarHardskill({
                            id: Math.random() * 100,
                            nome: hardskill,
                          })
                        }
                        bg={"none"}
                        rounded={"full"}
                        h={"30px"}
                        color={"#2E2E2E"}
                      >
                        <Image
                          src="../../icons/icon-mais.svg"
                          pr={"10px"}
                          alt="icone mais"
                        />
                        Adicionar
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <SimpleGrid columns={2} gap={"15px"}>
                    {listHardskill.map((hardskill) => (
                      <Flex
                        bg={"#6D3BBF"}
                        rounded={"12px"}
                        py={"12px"}
                        px={"20px"}
                        key={hardskill.id}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Text
                          fontSize={"16px"}
                          fontWeight={"medium"}
                          color={"white"}
                        >
                          {hardskill.nome}
                        </Text>
                        <Button
                          bg={"none"}
                          _hover={{ bg: "#5A2DA4" }}
                          right={"-5px"}
                          rounded={"full"}
                          onClick={() =>
                            setListHardskill(
                              listHardskill.filter((e) => e.id !== hardskill.id)
                            )
                          }
                        >
                          <Image
                            src="../../icons/icon-close.svg"
                            minH={"10px"}
                            minW={"10px"}
                            alt="icone fechar"
                          />
                        </Button>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Flex>
                <Flex direction={"column"} gap={"12px"}>
                  <InputGroup>
                    <InputForm
                      type="text"
                      placeholder="Softskills"
                      onChange={(e) => setSoftskill(e.target.value)}
                    />
                    <InputRightElement w={"25%"}>
                      <Button
                        onClick={() =>
                          adicionarSoftskill({
                            id: Math.random() * 100,
                            nome: softskill,
                          })
                        }
                        bg={"none"}
                        rounded={"full"}
                        h={"30px"}
                        color={"#2E2E2E"}
                      >
                        <Image
                          src="../../icons/icon-mais.svg"
                          pr={"10px"}
                          alt="icone mais"
                        />
                        Adicionar
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <SimpleGrid columns={2} gap={"15px"}>
                    {listSoftskill.map((softskill) => {
                      return (
                        <Flex
                          bg={"#6D3BBF"}
                          rounded={"12px"}
                          py={"12px"}
                          px={"20px"}
                          key={softskill.id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text
                            fontSize={"16px"}
                            fontWeight={"medium"}
                            color={"white"}
                          >
                            {softskill.nome}
                          </Text>
                          <Button
                            bg={"none"}
                            _hover={{ bg: "#5A2DA4" }}
                            right={"-5px"}
                            rounded={"full"}
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
                              minH={"10px"}
                              minW={"10px"}
                            />
                          </Button>
                        </Flex>
                      );
                    })}
                  </SimpleGrid>
                </Flex>
              </>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <ButtonPrimary
              onClick={() => publicarVaga()}
              buttonText="Publicar"
              loadingText="Publicando"
              isLoading={
                isFetchingCriarVaga ||
                isFetchingCriarVagaHardSkill ||
                isFetchingCriarVagaSoftSkill
              }
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPublicarVaga;
