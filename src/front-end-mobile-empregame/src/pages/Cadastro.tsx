import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Divider,
  Flex,
  Pressable,
  Radio,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from "native-base";
import { SelectPrimary } from "../components/select-primary";
import React, { useState } from "react";
import { api } from "../utils/services/api";
import { AxiosError } from "axios";
import { useAuth } from "../context/auth";
import Toast from "react-native-toast-message";
import { InputForm } from "../components/input-form";
import { InputPassword } from "../components/input-password";
import { numberToPhone } from "../utils/regex/numberToPhone";
import Svg, { SvgProps, Path, Defs, G, ClipPath } from "react-native-svg";

export const Cadastro = () => {
  const { loginSubmit } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tipo, setTipo] = useState<"RECRUTADOR" | "CANDIDATO">("CANDIDATO");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [hardskill, setHardskill] = useState<string>("");
  const [listHardskill, setListHardskill] = useState<
    {
      id: number;
      nome: string;
      nivel_experiencia: number;
    }[]
  >([]);

  const [softskill, setSoftskill] = useState<string>("");
  const [listSoftskill, setListSoftskill] = useState<
    {
      id: number;
      nome: string;
      nivel_experiencia: number;
    }[]
  >([]);

  const adicionarHardskill = (hardskill: {
    id: number;
    nome: string;
    nivel_experiencia: number;
  }) => {
    setListHardskill((old) => [...old, hardskill]);
  };

  const adicionarSoftskill = (softskill: {
    id: number;
    nome: string;
    nivel_experiencia: number;
  }) => {
    setListSoftskill((old) => [...old, softskill]);
  };

  const cadastrar = async () => {
    setIsLoading(true);
    try {
      await api
        .post("/usuarios", {
          nome: nome,
          tipo: tipo,
          senha: senha,
          email: email,
          telefone: telefone,
          github: tipo === "CANDIDATO" ? github : "",
          portfolio: tipo === "CANDIDATO" ? portfolio : "",
        })
        .then((data: { data: { id: number } }) => {
          const idUsuario = data.data.id;
          if (tipo === "CANDIDATO") {
            listHardskill.map((hardskill) => {
              api
                .post("/hardskills", {
                  nome: hardskill.nome,
                })
                .then((data: { data: { id: number } }) => {
                  const idHardskill = data.data.id;
                  api.post("/usuarios/hardskills", {
                    nivel_experiencia: hardskill.nivel_experiencia,
                    id_usuario: idUsuario,
                    id_hardskill: idHardskill,
                  });
                });
            });
            listSoftskill.map((softskill) => {
              api
                .post("/softskills", {
                  nome: softskill.nome,
                })
                .then((data: { data: { id: number } }) => {
                  const idSoftskill = data.data.id;
                  api.post("/usuarios/softskills", {
                    nivel_experiencia: softskill.nivel_experiencia,
                    id_usuario: idUsuario,
                    id_softskill: idSoftskill,
                  });
                });
            });
          }
        })
        .catch((err) => {
          const error = err.response.data as AxiosError<{
            statusCode: number;
            message: string;
          }>;
          Toast.show({ text1: error.message, type: "error" });
        });

      await loginSubmit(email, senha).then(() => {
        Toast.show({
          text1: "Cadastro realizado com sucesso!",
          type: "success",
        });
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView flex={1}>
      <View flex={1} flexDirection={"column"}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#7345D6", "#DA4FE2"]}
          start={{ x: -0.2, y: 0.5 }}
          end={{ x: 1, y: -0.3 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <Flex flex={2} padding={"35px"}>
          <Text
            fontSize={"48px"}
            fontWeight={"bold"}
            pb={"35px"}
            color={"white"}
          >
            Cadastro
          </Text>
          <VStack direction={"column"} space={"30px"}>
            <Text color={"white"} fontSize={"24px"} fontFamily={"Outfit-600"}>
              Primeiro precisamos saber quem você é?
            </Text>

            <SelectPrimary
              defaultValue="CANDIDATO"
              onValueChange={(e) => setTipo(e as "RECRUTADOR" | "CANDIDATO")}
            >
              <Select.Item label="Candidato" value="CANDIDATO" />
              <Select.Item label="Recrutador" value="RECRUTADOR" />
            </SelectPrimary>

            <Divider />

            <VStack space={"16px"}>
              <InputForm
                type="text"
                placeholder="Nome *"
                onChange={(e) => setNome(e)}
              />
              <InputForm
                keyboardType="email-address"
                type="text"
                placeholder="E-mail *"
                onChange={(e) => setEmail(e)}
              />
              <InputPassword
                placeholder="Senha *"
                onChange={(e) => setSenha(e)}
              />
              <InputForm
                keyboardType="phone-pad"
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(numberToPhone(e))}
              />
              {tipo === "CANDIDATO" && (
                <>
                  <InputForm
                    type="text"
                    placeholder="GitHub"
                    onChange={(e) => setGithub(e)}
                  />
                  <InputForm
                    type="text"
                    placeholder="Portfólio"
                    onChange={(e) => setPortfolio(e)}
                  />
                </>
              )}
            </VStack>
            {tipo === "CANDIDATO" && (
              <>
                <VStack space={"12px"}>
                  <InputForm
                    type="text"
                    placeholder="Hardskills"
                    onChange={(e) => setHardskill(e)}
                    InputRightElement={
                      <Pressable
                        onPress={() =>
                          adicionarHardskill({
                            id: Math.random() * 100,
                            nome: hardskill,
                            nivel_experiencia: 1,
                          })
                        }
                        bg={"none"}
                        rounded={"full"}
                        h={"30px"}
                        color={"#2E2E2E"}
                      >
                        <IconMais />
                        <Text>Adicionar</Text>
                      </Pressable>
                    }
                  />

                  <VStack space={"15px"}>
                    {listHardskill.map((hardskill) => (
                      <Flex
                        direction={"column"}
                        bg={"#6D3BBF"}
                        rounded={"12px"}
                        py={"12px"}
                        px={"20px"}
                        key={hardskill.id}
                      >
                        <Flex justifyContent={"space-between"}>
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
                            position={"relative"}
                            top={"-8px"}
                            right={"-15px"}
                            rounded={"full"}
                            maxW={"10px"}
                          >
                            <IconClose />
                          </Pressable>
                        </Flex>
                        <VStack space={"8px"}>
                          {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            const hardskillIndex = listHardskill.findIndex(
                              (e) => e.id === hardskill.id
                            );
                            return (
                              <Box key={Math.random() * index}>
                                <Radio
                                  value={hardskill.nivel_experiencia.toString()}
                                  onTouchStart={() => {
                                    const tempHardskills = [...listHardskill];

                                    tempHardskills[
                                      hardskillIndex
                                    ].nivel_experiencia = currentRating;

                                    setListHardskill(tempHardskills);
                                  }}
                                  style={{ display: "none" }}
                                />
                                <IconStar
                                  fill={
                                    currentRating <=
                                    listHardskill[hardskillIndex]
                                      .nivel_experiencia
                                      ? "#FFB800"
                                      : "white"
                                  }
                                />
                              </Box>
                            );
                          })}
                        </VStack>
                      </Flex>
                    ))}
                  </VStack>
                </VStack>
                {/*                 <VStack space={"12px"}>
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
                            nivel_experiencia: 1,
                          })
                        }
                        bg={"none"}
                        rounded={"full"}
                        h={"30px"}
                        color={"#2E2E2E"}
                      >
                        <Image
                          src="./icons/icon-mais.svg"
                          pr={"10px"}
                          alt="icone mais"
                        />
                        Adicionar
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <SimpleGrid columns={2} gap={"15px"}>
                    {listSoftskill.map((softskill) => {
                      const softskillIndex = listSoftskill.findIndex(
                        (e) => e.id === softskill.id
                      );
                      return (
                        <Flex
                          direction={"column"}
                          bg={"#6D3BBF"}
                          rounded={"12px"}
                          py={"12px"}
                          px={"20px"}
                          key={softskill.id}
                        >
                          <Flex justifyContent={"space-between"}>
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
                              position={"relative"}
                              top={"-8px"}
                              right={"-15px"}
                              rounded={"full"}
                              maxW={"10px"}
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
                                src="/icons/icon-close.svg"
                                minH={"10px"}
                                minW={"10px"}
                              />
                            </Button>
                          </Flex>
                          <Flex gap={"8px"}>
                            {[...Array(5)].map((star, index) => {
                              const currentRating = index + 1;
                              return (
                                <label key={Math.random() * index}>
                                  <input
                                    type="radio"
                                    name="rating"
                                    value={softskill.nivel_experiencia}
                                    onClick={() => {
                                      const tempSoftskills = [...listSoftskill];

                                      tempSoftskills[
                                        softskillIndex
                                      ].nivel_experiencia = currentRating;

                                      setListSoftskill(tempSoftskills);
                                    }}
                                    style={{
                                      display: "none",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <IconStar
                                    fill={
                                      currentRating <=
                                      listSoftskill[softskillIndex]
                                        .nivel_experiencia
                                        ? "#FFB800"
                                        : "white"
                                    }
                                  />
                                </label>
                              );
                            })}
                          </Flex>
                        </Flex>
                      );
                    })}
                  </SimpleGrid>
                </VStack> */}
              </>
            )}
          </VStack>
        </Flex>
      </View>
    </ScrollView>
  );
};

const IconMais = (props: SvgProps) => (
  <Svg width={13} height={12} fill="none" {...props}>
    <Path
      fill="#5A2DA4"
      d="M12.188 5.25H7.311V.75C7.313.336 6.95 0 6.5 0c-.449 0-.813.336-.813.75v4.5H.813C.364 5.25 0 5.586 0 6s.364.75.813.75h4.875v4.5c0 .414.363.75.812.75.449 0 .813-.336.813-.75v-4.5h4.875c.448 0 .812-.336.812-.75s-.364-.75-.813-.75Z"
    />
  </Svg>
);

const IconClose = (props: SvgProps) => (
  <Svg width={11} height={12} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M6.472 6 10.8 1.674a.688.688 0 0 0-.973-.973L5.5 5.028 1.174.7a.688.688 0 1 0-.973.973L4.528 6 .2 10.326a.688.688 0 0 0 .973.973L5.5 6.972 9.826 11.3a.688.688 0 0 0 .973-.973L6.472 6Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h11v11H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const IconStar = (props: { fill: string }) => (
  <Svg width={16} height={16}>
    <G clipPath="url(#a)">
      <Path
        fill={props.fill}
        d="M.885 8.267 3.258 10l-.901 2.792a2.119 2.119 0 0 0 .789 2.408 2.118 2.118 0 0 0 2.533-.012L8 13.48l2.321 1.706a2.15 2.15 0 0 0 3.322-2.394L12.742 10l2.373-1.733a2.151 2.151 0 0 0-1.266-3.888h-2.916l-.884-2.757a2.152 2.152 0 0 0-4.098 0l-.884 2.757H2.154A2.151 2.151 0 0 0 .887 8.267H.885Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
