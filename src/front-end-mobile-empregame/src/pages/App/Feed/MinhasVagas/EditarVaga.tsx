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
import { IconClose, IconEdit, IconMais } from "../../../../components/icons";
import { ButtonPrimary } from "../../../../components/button-primary";
import { SelectSecondary } from "../../../../components/select-secondary";
import { Platform } from "react-native";

export const EditarVaga = (props: {
  vaga?: IVaga | null;
  refetch: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
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
        Toast.show({ text1: "Vaga atualizada com sucesso!", type: "success" });
        setShowModal(false);
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
    if (descricao === "")
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
      Toast.show({
        text1: "Campos incompletos/incorretos",
        type: "error",
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
        onPress={() => setShowModal(true)}
        bg={"white"}
        borderColor={"#6D3BBF"}
        borderWidth={"2px"}
        rounded={"full"}
        py={"10px"}
        px={"25px"}
        flex={1}
      >
        <HStack space={"10px"} alignItems={"center"}>
          <IconEdit />
          <Text
            fontFamily={"Outfit-500"}
            color={"#6D3BBF"}
            fontWeight={"semibold"}
            textAlign={"center"}
            fontSize={"18px"}
          >
            Editar
          </Text>
        </HStack>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"xl"}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text color={"#5A2DA4"} fontFamily={"Outfit-600"} fontSize={"18px"}>
              Editar Vaga
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
                  value={nomeVaga}
                  onChange={(e) => setNomeVaga(e)}
                  messageError={
                    errors.find((e) => e.field === "nomeVaga")?.message
                  }
                />
                <VStack>
                  <TextArea
                    fontFamily={"Outfit-500"}
                    fontSize={"16px"}
                    borderRadius={"14px"}
                    placeholder="Descrição *"
                    value={descricao}
                    onChange={(e: any) => setDescricao(e.currentTarget.value)}
                    autoCompleteType={undefined}
                  />
                  {descricao === "" ? (
                    <Text color={"red.400"} fontSize={"14px"}>
                      {errors.find((e) => e.field === "descricao")?.message}
                    </Text>
                  ) : (
                    ""
                  )}
                </VStack>

                <TextArea
                  fontFamily={"Outfit-500"}
                  fontSize={"16px"}
                  borderRadius={"14px"}
                  placeholder="Benefícios"
                  value={beneficios}
                  onChange={(e: any) => setBeneficios(e.currentTarget.value)}
                  autoCompleteType={undefined}
                />
                <InputForm
                  type="text"
                  placeholder="Empresa *"
                  value={empresa}
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
                  defaultValue={estadoEmpresa}
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
                  defaultValue={cidadeEmpresa}
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
                    placeholder="Hardskills"
                    onChange={(e) => setHardskill(e)}
                    value={hardskill}
                    InputRightElement={
                      <Pressable
                        onPress={() => {
                          adicionarHardskill({
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
                    {hardskillsAtuais &&
                      hardskillsAtuais.map((hardskill) => {
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
                                {hardskill.hardskill?.nome}
                              </Text>
                              <Pressable
                                onPress={() =>
                                  api
                                    .delete("/vagas/hardskills/" + hardskill.id)
                                    .then(() => refetchHardSkill())
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
                      placeholder="Softskills"
                      onChange={(e) => setSoftskill(e)}
                      value={softskill}
                      InputRightElement={
                        <Pressable
                          onPress={() => {
                            adicionarSoftskill({
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
                      {softskillsAtuais &&
                        softskillsAtuais.map((softskill) => {
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
                                  {softskill.softskill?.nome}
                                </Text>
                                <Pressable
                                  onPress={() =>
                                    api
                                      .delete(
                                        "/vagas/softskills/" + softskill.id
                                      )
                                      .then(() => refetchSoftSkill())
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
              buttonText="Salvar"
              loadingText="Salvando"
              isLoading={isFetchingAtualizarVaga}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
