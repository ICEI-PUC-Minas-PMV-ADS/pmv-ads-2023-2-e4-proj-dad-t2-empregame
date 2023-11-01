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

const ModalEditarVaga = (props: { refetch: () => void }) => {
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
        gap={"10px"}
        color={"#6D3BBF"}
        fontSize={"18px"}
        fontWeight={"semibold"}
        bg={"white"}
        borderColor={"#6D3BBF"}
        borderWidth={"2px"}
        rounded={"full"}
        textAlign={"center"}
        py={"10px"}
        px={"25px"}
        w={"full"}
        _hover={{
          bg: "#5A2DA4",
          transition: "ease-in",
          boxShadow: "lg",
          color: "white",
          borderColor: "#5A2DA4",
        }}
      >
        <IconEdit />
        Editar Vaga
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} gap={"15px"} color={"#5A2DA4"}>
            <Image
              src={"../../icons/icon-publicarVaga.svg"}
              alt="icone publicar vaga"
            />
            Editar Vaga
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
              isLoading={isFetchingCriarVaga}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditarVaga;

const IconEdit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <g clipPath="url(#clip0_38_2723)">
        <path
          d="M16 17.125V21.2375C16.6176 21.0258 17.1795 20.6777 17.6441 20.219L19.9681 17.8933C20.4273 17.4292 20.7758 16.8675 20.9875 16.25H16.875C16.6429 16.25 16.4204 16.3422 16.2563 16.5063C16.0922 16.6704 16 16.8929 16 17.125Z"
          fill="currentColor"
        />
        <path
          d="M6.5255 12.5995C6.20037 12.9245 5.94246 13.3104 5.7665 13.7351C5.59054 14.1599 5.49998 14.6151 5.5 15.0748V16.25H6.67513C7.13486 16.25 7.5901 16.1594 8.01483 15.9835C8.43956 15.8075 8.82547 15.5496 9.1505 15.2245L19.0625 5.31245C19.4106 4.96436 19.6062 4.49224 19.6062 3.99995C19.6062 3.50767 19.4106 3.03555 19.0625 2.68745C18.7144 2.33936 18.2423 2.1438 17.75 2.1438C17.2577 2.1438 16.7856 2.33936 16.4375 2.68745L6.5255 12.5995Z"
          fill="currentColor"
        />
        <path
          d="M21.25 4.833C21.101 5.48208 20.7737 6.07665 20.305 6.54975L10.3878 16.4626C9.90131 16.9516 9.3227 17.3393 8.68543 17.6032C8.04816 17.8671 7.36487 18.002 6.67513 18H5.5C5.03587 18 4.59075 17.8156 4.26256 17.4874C3.93437 17.1592 3.75 16.7141 3.75 16.25V15.0749C3.74808 14.3852 3.88306 13.702 4.14711 13.0648C4.41116 12.4277 4.79903 11.8493 5.28825 11.3631L15.2003 1.45025C15.6698 0.980847 16.261 0.651759 16.9074 0.5C16.896 0.5 16.8864 0.5 16.875 0.5H4.625C3.4651 0.501389 2.35311 0.962772 1.53294 1.78294C0.712772 2.60311 0.251389 3.7151 0.25 4.875L0.25 17.125C0.251389 18.2849 0.712772 19.3969 1.53294 20.2171C2.35311 21.0372 3.4651 21.4986 4.625 21.5H14.25V17.125C14.25 16.4288 14.5266 15.7611 15.0188 15.2688C15.5111 14.7766 16.1788 14.5 16.875 14.5H21.25V4.875C21.25 4.861 21.25 4.84788 21.25 4.833Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_2723">
          <rect
            width="21"
            height="21"
            fill="white"
            transform="translate(0.25 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
