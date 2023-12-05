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
import { useEffect, useState } from "react";

const ModalEditarVaga = (props: {
  vaga?: IVaga | null;
  refetch: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [nomeVaga, setNomeVaga] = useState<string>(props.vaga?.nome || "");
  const [descricao, setDescricao] = useState<string>(
    props.vaga?.descricao || ""
  );
  const [beneficios, setBeneficios] = useState<string>(
    props.vaga?.beneficios || ""
  );
  const [empresa, setEmpresa] = useState<string>(
    props.vaga?.empresa_nome || ""
  );
  const [estadoEmpresa, setEstadoEmpresa] = useState<string>(
    props.vaga?.empresa_estado || ""
  );
  const [cidadeEmpresa, setCidadeEmpresa] = useState<string>(
    props.vaga?.empresa_cidade || ""
  );
  const [salario, setSalario] = useState<string>(props.vaga?.salario || "");
  const [hardskill, setHardskill] = useState<string>("");

  const [softskill, setSoftskill] = useState<string>("");

  const { data: hardskillsAtuais, refetch: refetchHardSkill } = useFetch<
    IVagaHardSkill[]
  >("/vagas/hardskills/" + props.vaga?.id);

  const adicionarHardskill = (newHardskill: { nome: string }) => {
    if (!hardskill) {
      setErrors((old) => [
        ...old,
        {
          field: "hardskill",
          message: "Preecha o campo para adicionar a Hardskill",
        },
      ]);
    } else {
      api
        .post("/hardskills", {
          nome: newHardskill.nome,
        })
        .then((data: { data: { id: number } }) => {
          const idHardskill = data.data.id;
          api
            .post("/vagas/hardskills", {
              id_vaga: props.vaga?.id,
              id_hardskill: idHardskill,
            })
            .then(() => refetchHardSkill());
        });
    }
  };

  const { data: softskillsAtuais, refetch: refetchSoftSkill } = useFetch<
    IVagaSoftSkill[]
  >("/vagas/softskills/" + props.vaga?.id);

  const adicionarSoftskill = (newSoftskill: { nome: string }) => {
    if (!softskill) {
      setErrors((old) => [
        ...old,
        {
          field: "softskill",
          message: "Preecha o campo para adicionar a Softskill",
        },
      ]);
    } else {
      api
        .post("/softskills", {
          nome: newSoftskill.nome,
        })
        .then((data: { data: { id: number } }) => {
          const idSoftskill = data.data.id;
          api
            .post("/vagas/softskills", {
              id_vaga: props.vaga?.id,
              id_softskill: idSoftskill,
            })
            .then(() => refetchSoftSkill());
        });
    }
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

  const { mutate: mutateAtualizarVaga, isFetching: isFetchingAtualizarVaga } =
    useMutation<IVaga>("/vagas/" + props.vaga?.id, {
      method: "PATCH",
      onSuccess: () => {
        props.refetch();
        toast({ title: "Vaga atualizada com sucesso!", status: "success" });
        onClose();
      },
      onError: (err) => {
        toast({ title: err.message, status: "error" });
      },
    });

  const publicarVaga = () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (!nomeVaga)
      erros.push({
        field: "nomeVaga",
        message: "Preencha o campo Nome da Vaga",
      });
    if (!descricao)
      erros.push({ field: "descricao", message: "Preencha o campo Descrição" });
    if (!empresa)
      erros.push({ field: "empresa", message: "Preencha o campo Empresa" });
    if (!estadoEmpresa)
      erros.push({
        field: "estadoEmpresa",
        message: "Preencha o campo Estado",
      });
    if (!cidadeEmpresa)
      erros.push({
        field: "cidadeEmpresa",
        message: "Preencha o campo Cidade",
      });
    if (!salario)
      erros.push({ field: "salario", message: "Preencha o campo Salário" });

    if (hardskillsAtuais && hardskillsAtuais.length <= 0)
      erros.push({
        field: "hardskill",
        message: "Adicione pelo menos uma HardSkill",
      });
    if (softskillsAtuais && softskillsAtuais.length <= 0)
      erros.push({
        field: "softskill",
        message: "Adicione pelo menos uma SoftSkill",
      });

    if (erros.length > 0) {
      toast({
        title: "Campos incompletos/incorretos",
        status: "error",
      });
      return setErrors(erros);
    }

    mutateAtualizarVaga({
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

  useEffect(() => {
    setErrors([]);
  }, [
    nomeVaga,
    descricao,
    empresa,
    estadoEmpresa,
    cidadeEmpresa,
    hardskillsAtuais,
    softskillsAtuais,
  ]);

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
                value={nomeVaga}
                onChange={(e) => setNomeVaga(e.target.value)}
                messageError={
                  errors.find((e) => e.field === "nomeVaga")?.message
                }
              />
              <Flex flexDirection={"column"}>
                <Textarea
                  borderRadius={"14px"}
                  placeholder="Descrição *"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <Text color={"red.400"} fontSize={"14px"}>
                  {errors.find((e) => e.field === "descricao")?.message}
                </Text>
              </Flex>
              <Textarea
                borderRadius={"14px"}
                placeholder="Benefícios"
                value={beneficios}
                onChange={(e) => setBeneficios(e.target.value)}
              />
              <SimpleGrid columns={2} spacingY={"16px"} spacingX={"30px"}>
                <InputForm
                  type="text"
                  placeholder="Empresa *"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  messageError={
                    errors.find((e) => e.field === "empresa")?.message
                  }
                />
                <InputForm
                  type="text"
                  placeholder="Salário *"
                  value={salario}
                  onChange={(e) => setSalario(numberToBRL(e.target.value))}
                  messageError={
                    errors.find((e) => e.field === "salario")?.message
                  }
                />
                <InputSelect
                  placeholder="Estado *"
                  value={estadoEmpresa}
                  onChange={(e) => setEstadoEmpresa(e.target.value)}
                  messageError={
                    errors.find((e) => e.field === "estadoEmpresa")?.message
                  }
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
                  value={cidadeEmpresa}
                  onChange={(e) => setCidadeEmpresa(e.target.value)}
                  messageError={
                    errors.find((e) => e.field === "cidadeEmpresa")?.message
                  }
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
                  <InputForm
                    type="text"
                    placeholder="Hardskills"
                    value={hardskill}
                    onChange={(e) => setHardskill(e.target.value)}
                    InputRightElement={
                      <InputRightElement w={"25%"}>
                        <Button
                          onClick={() => {
                            adicionarHardskill({
                              nome: hardskill,
                            });
                            setHardskill("");
                          }}
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
                    }
                    messageError={
                      errors.find((e) => e.field === "hardskill")?.message
                    }
                  />

                  <SimpleGrid columns={2} gap={"15px"}>
                    {hardskillsAtuais &&
                      hardskillsAtuais.map((hardskill) => (
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
                            {hardskill.hardskill?.nome}
                          </Text>
                          <Button
                            bg={"none"}
                            _hover={{ bg: "#5A2DA4" }}
                            right={"-5px"}
                            rounded={"full"}
                            onClick={() =>
                              api
                                .delete("/vagas/hardskills/" + hardskill.id)
                                .then(() => refetchHardSkill())
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
                  <InputForm
                    type="text"
                    placeholder="Softskills"
                    value={softskill}
                    onChange={(e) => setSoftskill(e.target.value)}
                    InputRightElement={
                      <InputRightElement w={"25%"}>
                        <Button
                          onClick={() => {
                            adicionarSoftskill({
                              nome: softskill,
                            });
                            setSoftskill("");
                          }}
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
                    }
                    messageError={
                      errors.find((e) => e.field === "softskill")?.message
                    }
                  />

                  <SimpleGrid columns={2} gap={"15px"}>
                    {softskillsAtuais &&
                      softskillsAtuais.map((softskill) => {
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
                              {softskill.softskill?.nome}
                            </Text>
                            <Button
                              bg={"none"}
                              _hover={{ bg: "#5A2DA4" }}
                              right={"-5px"}
                              rounded={"full"}
                              onClick={() =>
                                api
                                  .delete("/vagas/softskills/" + softskill.id)
                                  .then(() => refetchSoftSkill())
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
              buttonText="Salvar"
              loadingText="Salvando"
              isLoading={isFetchingAtualizarVaga}
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
