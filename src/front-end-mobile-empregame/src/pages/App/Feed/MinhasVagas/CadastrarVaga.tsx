import {
  Button,
  Flex,
  HStack,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useFetch } from "../../../../utils/hooks/useFetch";
import { api } from "../../../../utils/services/api";
import { useMutation } from "../../../../utils/hooks/useMutation";
import {
  IVaga,
  IVagaHardSkill,
  IVagaSoftSkill,
} from "../../../../interface/IVaga";
import { InputForm } from "../../../../components/input-form";
import { numberToBRL } from "../../../../utils/regex/numberToBRL";
import {
  IconClose,
  IconMais,
  IconPublicarVaga,
} from "../../../../components/icons";
import { ButtonPrimary } from "../../../../components/button-primary";
import { SelectSecondary } from "../../../../components/select-secondary";
import { Platform } from "react-native";

export const CadastrarVaga = (props: { refetch: () => void }) => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
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

  const adicionarHardskill = (newHardskill: { id: number; nome: string }) => {
    if (!hardskill) {
      setErrors((old) => [
        ...old,
        {
          field: "hardskill",
          message: "Preecha o campo para adicionar a Hardskill",
        },
      ]);
    } else {
      setListHardskill((old) => [...old, newHardskill]);
    }
  };

  const adicionarSoftskill = (newSoftskill: { id: number; nome: string }) => {
    if (!softskill) {
      setErrors((old) => [
        ...old,
        {
          field: "softskill",
          message: "Preecha o campo para adicionar a Softskill",
        },
      ]);
    } else {
      setListSoftskill((old) => [...old, newSoftskill]);
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
        Toast.show({ text1: "Vaga publicada com sucesso!", type: "success" });
        setShowModal(false);
        setSalario("");
        setListHardskill([]);
        setListSoftskill([]);
      },
      onError: (err) => {
        Toast.show({ text1: err.message, type: "error" });
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

    if (listHardskill.length <= 0)
      erros.push({
        field: "hardskill",
        message: "Adicione pelo menos uma HardSkill",
      });
    if (listSoftskill.length <= 0)
      erros.push({
        field: "softskill",
        message: "Adicione pelo menos uma SoftSkill",
      });

    if (erros.length > 0) {
      Toast.show({
        text1: "Campos incompletos/incorretos",
        type: "error",
      });
      return setErrors(erros);
    }

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

  useEffect(() => {
    setErrors([]);
  }, [
    nomeVaga,
    descricao,
    empresa,
    estadoEmpresa,
    cidadeEmpresa,
    listHardskill,
    listSoftskill,
  ]);

  return (
    <>
      <Button
        marginX={"15px"}
        marginY={"20px"}
        py={"10px"}
        px={"25px"}
        borderWidth={"1px"}
        borderColor={"#E1E1E1"}
        rounded={"13px"}
        fontWeight={"semibold"}
        _pressed={{ shadow: "lg", background: "none" }}
        onPress={() => setShowModal(true)}
        bg={"white"}
      >
        <HStack alignItems={"center"} space={"10px"}>
          <IconPublicarVaga />
          <Text color={"#6D3BBF"} fontSize={"20px"} fontFamily={"Outfit-600"}>
            Publicar Vaga
          </Text>
        </HStack>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"xl"}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text color={"#5A2DA4"} fontFamily={"Outfit-600"} fontSize={"18px"}>
              Publicar Vaga
            </Text>
          </Modal.Header>
          <Modal.Body>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              flex={1}
            >
              <VStack space={"15px"}>
                <InputForm
                  type="text"
                  placeholder="Nome da Vaga *"
                  onChange={(e) => setNomeVaga(e)}
                  messageError={
                    errors.find((e) => e.field === "nomeVaga")?.message
                  }
                />
                <InputForm
                  type="text"
                  placeholder="Descrição *"
                  multiline={true}
                  numberOfLines={3}
                  onChange={(e) => setDescricao(e)}
                  messageError={
                    errors.find((e) => e.field === "descricao")?.message
                  }
                />
                <InputForm
                  type="text"
                  placeholder="Benefícios"
                  multiline={true}
                  numberOfLines={3}
                  onChange={(e) => setBeneficios(e)}
                />

                <InputForm
                  type="text"
                  placeholder="Empresa *"
                  onChange={(e) => setEmpresa(e)}
                  messageError={
                    errors.find((e) => e.field === "empresa")?.message
                  }
                />
                <InputForm
                  type="text"
                  placeholder="Salário *"
                  value={salario}
                  keyboardType="number-pad"
                  onChange={(e) => setSalario(numberToBRL(e))}
                  messageError={
                    errors.find((e) => e.field === "salario")?.message
                  }
                />
                <SelectSecondary
                  placeholder="Estado *"
                  onValueChange={(e) => {
                    setEstadoEmpresa(e);
                  }}
                  messageError={
                    errors.find((e) => e.field === "estadoEmpresa")?.message
                  }
                >
                  {estados &&
                    estados.map((e) => (
                      <Select.Item key={e.id} label={e.nome} value={e.nome} />
                    ))}
                </SelectSecondary>
                <SelectSecondary
                  placeholder="Cidade *"
                  onValueChange={(e) => setCidadeEmpresa(e)}
                  messageError={
                    errors.find((e) => e.field === "cidadeEmpresa")?.message
                  }
                >
                  {cidades &&
                    cidades.map((c) => (
                      <Select.Item key={c.id} label={c.nome} value={c.nome} />
                    ))}
                </SelectSecondary>

                <VStack space={"12px"}>
                  <InputForm
                    type="text"
                    placeholder="Hardskills *"
                    onChange={(e) => setHardskill(e)}
                    value={hardskill}
                    InputRightElement={
                      <Pressable
                        onPress={() => {
                          adicionarHardskill({
                            id: Math.random() * 100,
                            nome: hardskill,
                          });
                          setHardskill("");
                        }}
                        bg={"none"}
                        rounded={"full"}
                        h={"30px"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        pr={"20px"}
                      >
                        <IconMais />
                        <Text
                          color={"#2E2E2E"}
                          fontFamily={"Outfit-600"}
                          pl={"10px"}
                        >
                          Adicionar
                        </Text>
                      </Pressable>
                    }
                    messageError={
                      errors.find((e) => e.field === "hardskill")?.message
                    }
                  />

                  <VStack space={"15px"}>
                    {listHardskill.map((hardskill) => {
                      return (
                        <VStack
                          direction={"column"}
                          bg={"#6D3BBF"}
                          rounded={"12px"}
                          py={"12px"}
                          px={"20px"}
                          key={hardskill.id}
                          space={"8px"}
                        >
                          <Flex
                            direction="row"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Text
                              fontSize={"16px"}
                              fontWeight={"medium"}
                              color={"white"}
                            >
                              {hardskill.nome}
                            </Text>
                            <Pressable
                              onPress={() =>
                                setListHardskill(
                                  listHardskill.filter(
                                    (e) => e.id !== hardskill.id
                                  )
                                )
                              }
                              bg={"none"}
                              rounded={"full"}
                              maxW={"10px"}
                            >
                              <IconClose />
                            </Pressable>
                          </Flex>
                        </VStack>
                      );
                    })}
                  </VStack>

                  <VStack space={"12px"}>
                    <InputForm
                      type="text"
                      placeholder="Softskills *"
                      onChange={(e) => setSoftskill(e)}
                      value={softskill}
                      InputRightElement={
                        <Pressable
                          onPress={() => {
                            adicionarSoftskill({
                              id: Math.random() * 100,
                              nome: softskill,
                            });
                            setSoftskill("");
                          }}
                          bg={"none"}
                          rounded={"full"}
                          h={"30px"}
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                          pr={"20px"}
                        >
                          <IconMais />
                          <Text
                            color={"#2E2E2E"}
                            fontFamily={"Outfit-600"}
                            pl={"10px"}
                          >
                            Adicionar
                          </Text>
                        </Pressable>
                      }
                      messageError={
                        errors.find((e) => e.field === "softskill")?.message
                      }
                    />

                    <VStack space={"15px"}>
                      {listSoftskill.map((softskill) => {
                        return (
                          <VStack
                            direction={"column"}
                            bg={"#6D3BBF"}
                            rounded={"12px"}
                            py={"12px"}
                            px={"20px"}
                            key={softskill.id}
                            space={"8px"}
                          >
                            <Flex
                              direction="row"
                              alignItems={"center"}
                              justifyContent={"space-between"}
                            >
                              <Text
                                fontSize={"16px"}
                                fontWeight={"medium"}
                                color={"white"}
                              >
                                {softskill.nome}
                              </Text>
                              <Pressable
                                onPress={() =>
                                  setListSoftskill(
                                    listSoftskill.filter(
                                      (e) => e.id !== softskill.id
                                    )
                                  )
                                }
                                bg={"none"}
                                rounded={"full"}
                                maxW={"10px"}
                              >
                                <IconClose />
                              </Pressable>
                            </Flex>
                          </VStack>
                        );
                      })}
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>
            </KeyboardAvoidingView>
          </Modal.Body>
          <Modal.Footer>
            <ButtonPrimary
              onPress={() => publicarVaga()}
              buttonText="Publicar"
              loadingText="Publicando"
              isLoading={
                isFetchingCriarVaga ||
                isFetchingCriarVagaHardSkill ||
                isFetchingCriarVagaSoftSkill
              }
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
