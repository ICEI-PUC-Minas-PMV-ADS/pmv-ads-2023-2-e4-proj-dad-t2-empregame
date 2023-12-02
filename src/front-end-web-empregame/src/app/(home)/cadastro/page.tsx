"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Link } from "@chakra-ui/next-js";
import { InputForm } from "@/components/input-form";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/components/button-primary";
import { ButtonSelect } from "@/components/button-select";
import { api } from "@/utils/services/api";
import { AxiosError } from "axios";
import { IUsuario } from "@/interface/IUsuario";
import { useAppContext } from "@/utils/hooks/useContext";
import { useCookies } from "react-cookie";
import { authToken } from "@/utils/config/authToken";
import { useRouter } from "next/navigation";
import { numberToPhone } from "@/utils/regex/numberToPhone";
import { InputPassword } from "@/components/input-password";
import { isEmail } from "@/utils/validator/isEmail";

const Cadastro = () => {
  const { dispatch: dispatchAppContext } = useAppContext();
  const toast = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [cookie, setCookie] = useCookies([authToken.nome]);
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
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (!nome)
      erros.push({ field: "nome", message: "Preencha o campo Nome Completo" });
    if (!email)
      erros.push({ field: "email", message: "Preencha o campo E-mail" });
    if (!isEmail(email))
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail corretamente",
      });
    if (!senha)
      erros.push({ field: "senha", message: "Preencha o campo Senha" });
    if (telefone && telefone.length < 14)
      erros.push({ field: "telefone", message: "Telefone incorreto" });
    if (tipo === "CANDIDATO" && listHardskill.length <= 0)
      erros.push({
        field: "hardskill",
        message: "Adicione pelo menos uma HardSkill",
      });
    if (tipo === "CANDIDATO" && listSoftskill.length <= 0)
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
          toast({ title: error.message, status: "error" });
        });

      await api
        .post("/auth/login", {
          email: email,
          password: senha,
        })
        .then((data) => {
          const user = data.data as { access_token: string; usuario: IUsuario };

          setCookie(authToken.nome, user.access_token);
          dispatchAppContext({ payload: user.usuario, type: "SET_USUARIO" });
          router.push("/feed");
          toast({
            title: "Cadastro realizado com sucesso!",
            status: "success",
          });
        })
        .catch((err) => {
          const error = err.response.data as AxiosError<{
            statusCode: number;
            message: string;
          }>;
          toast({
            title: error.message,
            status: "error",
          });
        });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setErrors([]);
  }, [nome, senha, email, telefone, listHardskill, listSoftskill]);

  return (
    <Box
      bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
      minH={"80vh"}
      py={"80px"}
    >
      <Container
        maxW={"1366px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        h={"full"}
      >
        <Flex direction={"column"} minW={"340px"}>
          <Heading
            fontSize={"48px"}
            fontWeight={"bold"}
            pb={"35px"}
            color={"white"}
          >
            Cadastro
          </Heading>
          <Flex direction={"column"} gap={"30px"}>
            <Text color={"white"} fontSize={"24px"} fontWeight={"semibold"}>
              Primeiro precisamos saber quem você é?
            </Text>
            <Flex gap={"18px"}>
              <ButtonSelect
                onClick={() => setTipo("CANDIDATO")}
                bg={tipo === "CANDIDATO" ? "#5A2DA4" : "none"}
                borderColor={tipo === "CANDIDATO" ? "none" : "white"}
                borderWidth={tipo === "CANDIDATO" ? "none" : "1px"}
                buttonText={"Candidato"}
                color={"white"}
              />
              <ButtonSelect
                onClick={() => setTipo("RECRUTADOR")}
                bg={tipo === "RECRUTADOR" ? "#5A2DA4" : "none"}
                borderColor={tipo === "RECRUTADOR" ? "none" : "white"}
                borderWidth={tipo === "RECRUTADOR" ? "none" : "1px"}
                buttonText={"Recrutador"}
                color={"white"}
              />
            </Flex>

            <Divider />
            <SimpleGrid columns={2} spacingY={"16px"} spacingX={"30px"}>
              <InputForm
                type="text"
                placeholder="Nome *"
                onChange={(e) => setNome(e.target.value)}
                messageError={errors.find((e) => e.field === "nome")?.message}
              />
              <InputForm
                type="email"
                placeholder="E-mail *"
                onChange={(e) => setEmail(e.target.value)}
                messageError={errors.find((e) => e.field === "email")?.message}
              />
              <InputPassword
                placeholder="Senha *"
                onChange={(e) => setSenha(e.target.value)}
                messageError={errors.find((e) => e.field === "senha")?.message}
              />
              <InputForm
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(numberToPhone(e.target.value))}
                messageError={
                  errors.find((e) => e.field === "telefone")?.message
                }
              />
              {tipo === "CANDIDATO" && (
                <>
                  <InputForm
                    type="text"
                    placeholder="GitHub"
                    onChange={(e) => setGithub(e.target.value)}
                  />
                  <InputForm
                    type="text"
                    placeholder="Portfólio"
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </>
              )}
            </SimpleGrid>
            {tipo === "CANDIDATO" && (
              <>
                <Flex direction={"column"} gap={"12px"}>
                  <InputForm
                    type="text"
                    placeholder="Hardskills *"
                    onChange={(e) => setHardskill(e.target.value)}
                    value={hardskill}
                    InputRightElement={
                      <InputRightElement w={"25%"}>
                        <Button
                          onClick={() => {
                            adicionarHardskill({
                              id: Math.random() * 100,
                              nome: hardskill,
                              nivel_experiencia: 1,
                            });
                            setHardskill("");
                          }}
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
                    }
                    messageError={
                      errors.find((e) => e.field === "hardskill")?.message
                    }
                  />

                  <SimpleGrid columns={2} gap={"15px"}>
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
                          <Button
                            bg={"none"}
                            _hover={{ bg: "#5A2DA4" }}
                            position={"relative"}
                            top={"-8px"}
                            right={"-15px"}
                            rounded={"full"}
                            maxW={"10px"}
                            onClick={() =>
                              setListHardskill(
                                listHardskill.filter(
                                  (e) => e.id !== hardskill.id
                                )
                              )
                            }
                          >
                            <Image
                              alt="icone mais"
                              src="/icons/icon-close.svg"
                              minH={"10px"}
                              minW={"10px"}
                            />
                          </Button>
                        </Flex>
                        <Flex gap={"8px"}>
                          {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            const hardskillIndex = listHardskill.findIndex(
                              (e) => e.id === hardskill.id
                            );
                            return (
                              <label key={Math.random() * index}>
                                <input
                                  type="radio"
                                  name="rating"
                                  value={hardskill.nivel_experiencia}
                                  onClick={() => {
                                    const tempHardskills = [...listHardskill];

                                    tempHardskills[
                                      hardskillIndex
                                    ].nivel_experiencia = currentRating;

                                    setListHardskill(tempHardskills);
                                  }}
                                  style={{ display: "none", cursor: "pointer" }}
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
                              </label>
                            );
                          })}
                        </Flex>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Flex>
                <Flex direction={"column"} gap={"12px"}>
                  <InputForm
                    type="text"
                    placeholder="Softskills *"
                    onChange={(e) => setSoftskill(e.target.value)}
                    value={softskill}
                    InputRightElement={
                      <InputRightElement w={"25%"}>
                        <Button
                          onClick={() => {
                            adicionarSoftskill({
                              id: Math.random() * 100,
                              nome: softskill,
                              nivel_experiencia: 1,
                            });
                            setSoftskill("");
                          }}
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
                    }
                    messageError={
                      errors.find((e) => e.field === "softskill")?.message
                    }
                  />

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
                </Flex>
              </>
            )}

            <Box textAlign={"center"}>
              <ButtonPrimary
                onClick={() => cadastrar()}
                buttonText="Cadastrar"
                isLoading={isLoading}
                loadingText="Cadastrando"
              />
              <Link
                href={"/login"}
                fontSize={"18px"}
                color={"white"}
                fontWeight={"semibold"}
              >
                Já tem uma conta? Faça login
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Cadastro;

const IconStar = (props: { fill: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ cursor: "pointer" }}
    >
      <g clipPath="url(#clip0_27_3091)">
        <path
          d="M0.884551 8.26672L3.25788 10.0001L2.35655 12.7914C2.21089 13.2243 2.20905 13.6927 2.35129 14.1268C2.49353 14.5608 2.77225 14.9373 3.14588 15.2001C3.51312 15.4712 3.95815 15.6165 4.41465 15.6142C4.87116 15.6119 5.31471 15.4622 5.67922 15.1874L7.99988 13.4794L10.3212 15.1854C10.6878 15.455 11.1304 15.6015 11.5855 15.6037C12.0405 15.6059 12.4845 15.4638 12.8537 15.1977C13.2229 14.9317 13.4982 14.5554 13.6401 14.123C13.7819 13.6907 13.783 13.2244 13.6432 12.7914L12.7419 10.0001L15.1152 8.26672C15.4813 7.99906 15.7535 7.62255 15.8928 7.19098C16.0321 6.7594 16.0315 6.29484 15.891 5.86364C15.7505 5.43244 15.4774 5.05667 15.1106 4.78999C14.7438 4.52331 14.3021 4.37936 13.8486 4.37872H10.9332L10.0486 1.62138C9.90943 1.18736 9.63606 0.808727 9.26786 0.540094C8.89966 0.271462 8.45566 0.126709 7.99988 0.126709C7.54411 0.126709 7.1001 0.271462 6.7319 0.540094C6.36371 0.808727 6.09034 1.18736 5.95122 1.62138L5.06655 4.37872H2.15388C1.70038 4.37936 1.25868 4.52331 0.891871 4.78999C0.525063 5.05667 0.251912 5.43244 0.111432 5.86364C-0.0290475 6.29484 -0.0296693 6.7594 0.109656 7.19098C0.24898 7.62255 0.521125 7.99906 0.887218 8.26672H0.884551Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_27_3091">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
