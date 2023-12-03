import {
  Button,
  Flex,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useMutation } from "../../../utils/hooks/useMutation";
import { ButtonPrimary } from "../../../components/button-primary";
import StarRating from "react-native-star-rating-widget";
import { IconMais, IconClose } from "../../../components/icons";
import { InputForm } from "../../../components/input-form";
import { numberToPhone } from "../../../utils/regex/numberToPhone";
import {
  IUsuario,
  IUsuarioHardSkill,
  IUsuarioSoftSkill,
} from "../../../interface/IUsuario";
import { useFetch } from "../../../utils/hooks/useFetch";
import { api } from "../../../utils/services/api";
import { Platform } from "react-native";
import { isEmail } from "../../../utils/validator/isEmail";

export const EditarPerfil = (props: {
  usuario: IUsuario;
  refetch: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const userAtual = props.usuario;

  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [nome, setNome] = useState<string>(userAtual.nome);
  const [email, setEmail] = useState<string | undefined | null>(
    userAtual.email
  );
  const [telefone, setTelefone] = useState<string | undefined | null>(
    userAtual.telefone
  );
  const [github, setGithub] = useState<string | undefined | null>(
    userAtual.github
  );
  const [portfolio, setPortfolio] = useState<string | undefined | null>(
    userAtual.portfolio
  );
  const [linkedin, setLinkedin] = useState<string | undefined | null>(
    userAtual.linkedin
  );
  const [hardskill, setHardskill] = useState<string>("");

  const [softskill, setSoftskill] = useState<string>("");

  const { data: hardskillsAtuais, refetch: refetchHardSkill } = useFetch<
    IUsuarioHardSkill[]
  >("/usuarios/hardskills/" + userAtual.id);

  const adicionarHardskill = (hardskill: {
    nome: string;
    nivel_experiencia: number;
  }) => {
    api
      .post("/hardskills", {
        nome: hardskill.nome,
      })
      .then((data: { data: { id: number } }) => {
        const idHardskill = data.data.id;
        api
          .post("/usuarios/hardskills", {
            nivel_experiencia: hardskill.nivel_experiencia,
            id_usuario: userAtual.id,
            id_hardskill: idHardskill,
          })
          .then(() => refetchHardSkill());
      });
  };

  const { data: softskillsAtuais, refetch: refetchSoftSkill } = useFetch<
    IUsuarioSoftSkill[]
  >("/usuarios/softskills/" + userAtual.id);

  const adicionarSoftskill = (softskill: {
    nome: string;
    nivel_experiencia: number;
  }) => {
    api
      .post("/softskills", {
        nome: softskill.nome,
      })
      .then((data: { data: { id: number } }) => {
        const idSoftskill = data.data.id;
        api
          .post("/usuarios/softskills", {
            nivel_experiencia: softskill.nivel_experiencia,
            id_usuario: userAtual.id,
            id_softskill: idSoftskill,
          })
          .then(() => refetchSoftSkill());
      });
  };

  const {
    mutate: mutateAtualizarUsuario,
    isFetching: isFetchingAtualizarUsuario,
  } = useMutation<IUsuario>("/usuarios", {
    method: "PATCH",
    onSuccess: () => {
      props.refetch();
      Toast.show({ text1: "Dados atualizado com sucesso!", type: "success" });
      setShowModal(false);
    },
    onError: (err) => {
      Toast.show({ text1: err.message, type: "error" });
    },
  });

  const atualizarDados = () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (!nome)
      erros.push({ field: "nome", message: "Preencha o campo Nome Completo" });
    if (!email)
      erros.push({ field: "email", message: "Preencha o campo E-mail" });
    if (email && !isEmail(email))
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail corretamente",
      });
    if (telefone && telefone.length < 14)
      erros.push({ field: "telefone", message: "Telefone incorreto" });
    if (
      userAtual.tipo === "CANDIDATO" &&
      hardskillsAtuais &&
      hardskillsAtuais.length <= 0
    )
      erros.push({
        field: "hardskill",
        message: "Adicione pelo menos uma HardSkill",
      });
    if (
      userAtual.tipo === "CANDIDATO" &&
      softskillsAtuais &&
      softskillsAtuais.length <= 0
    )
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

    mutateAtualizarUsuario({
      nome: nome,
      email: email,
      telefone: telefone,
      linkedin: linkedin,
      github: github,
      portfolio: portfolio,
    });
  };

  useEffect(() => {
    setErrors([]);
  }, [nome, email, telefone, hardskillsAtuais, softskillsAtuais]);

  return (
    <>
      <Button bg={"none"} w={"full"} py={1} onPress={() => setShowModal(true)}>
        <Text color={"white"} fontFamily={"Outfit-600"}>
          Editar Informações
        </Text>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"xl"}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text color={"#5A2DA4"} fontFamily={"Outfit-600"} fontSize={"18px"}>
              Editar Informações
            </Text>
          </Modal.Header>
          <Modal.Body>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              flex={1}
            >
              <VStack space={"16px"}>
                <InputForm
                  type="text"
                  placeholder="Nome *"
                  value={nome}
                  onChange={(e) => setNome(e)}
                  messageError={errors.find((e) => e.field === "nome")?.message}
                />
                <InputForm
                  keyboardType="email-address"
                  type="text"
                  placeholder="E-mail *"
                  value={email ? email : ""}
                  onChange={(e) => setEmail(e)}
                  messageError={
                    errors.find((e) => e.field === "email")?.message
                  }
                />
                <InputForm
                  keyboardType="phone-pad"
                  type="text"
                  placeholder="Telefone"
                  value={telefone ? telefone : ""}
                  onChange={(e) => setTelefone(numberToPhone(e))}
                  messageError={
                    errors.find((e) => e.field === "telefone")?.message
                  }
                />
                {userAtual.tipo === "CANDIDATO" && (
                  <>
                    <InputForm
                      type="text"
                      placeholder="GitHub"
                      value={github ? github : ""}
                      onChange={(e) => setGithub(e)}
                    />
                    <InputForm
                      type="text"
                      placeholder="Portfólio"
                      value={portfolio ? portfolio : ""}
                      onChange={(e) => setPortfolio(e)}
                    />
                    <InputForm
                      type="text"
                      placeholder="Linkedin"
                      value={linkedin ? linkedin : ""}
                      onChange={(e) => setLinkedin(e)}
                    />
                  </>
                )}

                {userAtual.tipo === "CANDIDATO" && (
                  <>
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
                                nivel_experiencia: 1,
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
                                    {hardskill.hardskill.nome}
                                  </Text>
                                  <Pressable
                                    onPress={() => {
                                      api
                                        .delete(
                                          "/usuarios/hardskills/" + hardskill.id
                                        )
                                        .then(() => refetchHardSkill());
                                    }}
                                    bg={"none"}
                                    rounded={"full"}
                                    maxW={"10px"}
                                  >
                                    <IconClose />
                                  </Pressable>
                                </Flex>
                                <StarRating
                                  rating={hardskill.nivel_experiencia}
                                  onChange={(e) => {
                                    api
                                      .patch(
                                        "/usuarios/hardskills/" + hardskill.id,
                                        {
                                          nivel_experiencia: e,
                                        }
                                      )
                                      .then(() => refetchHardSkill());
                                  }}
                                  starStyle={{ borderRadius: 80 }}
                                  enableHalfStar={false}
                                  enableSwiping={false}
                                  animationConfig={{ delay: 0, duration: 0 }}
                                  color={"#FFB800"}
                                />
                              </VStack>
                            );
                          })}
                      </VStack>
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
                                nivel_experiencia: 1,
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
                                    {softskill.softskill.nome}
                                  </Text>
                                  <Pressable
                                    onPress={() => {
                                      api
                                        .delete(
                                          "/usuarios/softskills/" + softskill.id
                                        )
                                        .then(() => refetchSoftSkill());
                                    }}
                                    bg={"none"}
                                    rounded={"full"}
                                    maxW={"10px"}
                                  >
                                    <IconClose />
                                  </Pressable>
                                </Flex>
                                <StarRating
                                  rating={softskill.nivel_experiencia}
                                  onChange={(e) => {
                                    api
                                      .patch(
                                        "/usuarios/softskills/" + softskill.id,
                                        {
                                          nivel_experiencia: e,
                                        }
                                      )
                                      .then(() => refetchSoftSkill());
                                  }}
                                  starStyle={{ borderRadius: 80 }}
                                  enableHalfStar={false}
                                  enableSwiping={false}
                                  animationConfig={{ delay: 0, duration: 0 }}
                                  color={"#FFB800"}
                                />
                              </VStack>
                            );
                          })}
                      </VStack>
                    </VStack>
                  </>
                )}
              </VStack>
            </KeyboardAvoidingView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <ButtonPrimary
                onPress={() => atualizarDados()}
                buttonText="Salvar"
                loadingText="Salvando"
                isLoading={isFetchingAtualizarUsuario}
              />
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
