import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from "native-base";
import { SelectPrimary } from "../../components/select-primary";
import React, { useState } from "react";
import { api } from "../../utils/services/api";
import { AxiosError } from "axios";
import { useAuth } from "../../context/auth";
import Toast from "react-native-toast-message";
import { InputForm } from "../../components/input-form";
import { InputPassword } from "../../components/input-password";
import { numberToPhone } from "../../utils/regex/numberToPhone";

import StarRating from "react-native-star-rating-widget";
import { ButtonPrimary } from "../../components/button-primary";
import { IconMais, IconClose, IconVoltar } from "../../components/icons";
import { Platform } from "react-native";

export const Cadastro = ({ navigation }: any) => {
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
    <View flex={1}>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        <ScrollView padding={"35px"}>
          <Flex paddingBottom={"15px"}>
            <Button
              marginY={"20px"}
              alignSelf={"flex-start"}
              bg={"none"}
              rounded={"full"}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <HStack space={"10px"} alignItems={"center"}>
                <IconVoltar />
                <Text fontFamily={"Outfit-500"} color={"white"}>
                  Voltar
                </Text>
              </HStack>
            </Button>
          </Flex>
          <Flex>
            <Text
              fontSize={"36px"}
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
                    />

                    <VStack space={"15px"}>
                      {listHardskill.map((hardskill) => {
                        const hardskillIndex = listHardskill.findIndex(
                          (e) => e.id === hardskill.id
                        );
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
                            <StarRating
                              rating={hardskill.nivel_experiencia}
                              onChange={(e) => {
                                const tempHardskills = [...listHardskill];

                                tempHardskills[
                                  hardskillIndex
                                ].nivel_experiencia = e;

                                setListHardskill(tempHardskills);
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
                      InputRightElement={
                        <Pressable
                          onPress={() =>
                            adicionarSoftskill({
                              id: Math.random() * 100,
                              nome: softskill,
                              nivel_experiencia: 1,
                            })
                          }
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
                    />

                    <VStack space={"15px"}>
                      {listSoftskill.map((softskill) => {
                        const softskillIndex = listSoftskill.findIndex(
                          (e) => e.id === softskill.id
                        );
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
                            <StarRating
                              rating={softskill.nivel_experiencia}
                              onChange={(e) => {
                                const tempSoftskills = [...listSoftskill];

                                tempSoftskills[
                                  softskillIndex
                                ].nivel_experiencia = e;

                                setListSoftskill(tempSoftskills);
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
            <Box textAlign={"center"}>
              <ButtonPrimary
                onPress={() => cadastrar()}
                buttonText="Cadastrar"
                isLoading={isLoading}
                loadingText="Cadastrando"
              />
              <Button
                variant={"link"}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text
                  fontFamily={"Outfit-600"}
                  fontSize={"18px"}
                  color={"white"}
                >
                  Já tem uma conta? Faça login
                </Text>
              </Button>
            </Box>
          </Flex>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
