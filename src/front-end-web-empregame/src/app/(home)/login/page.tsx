"use client";

import { Box, Container, Flex, Heading, useToast } from "@chakra-ui/react";

import { Link } from "@chakra-ui/next-js";
import { InputForm } from "@/components/input-form";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/components/button-primary";
import { api } from "@/utils/services/api";
import { IUsuario } from "@/interface/IUsuario";
import { useCookies } from "react-cookie";
import { authToken } from "@/utils/config/authToken";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAppContext } from "@/utils/hooks/useContext";
import { InputPassword } from "@/components/input-password";
import { isEmail } from "@/utils/validator/isEmail";

const Login = () => {
  const { state: usuario, dispatch: dispatchAppContext } = useAppContext();
  const toast = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [cookie, setCookie] = useCookies([authToken.nome]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  useEffect(() => {
    if (usuario && cookie[authToken.nome]) {
      router.push("/feed");
    }
  }, [usuario, router, cookie]);

  const loginSubmit = async () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (!email)
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail",
      });

    if (!isEmail(email))
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail corretamente",
      });

    if (!senha)
      erros.push({
        field: "senha",
        message: "Preencha o campo Senha",
      });

    if (erros.length > 0) {
      toast({
        title: "Campos incompletos/incorretos",
        status: "error",
      });
      return setErrors(erros);
    }

    setIsLoading(true);
    await api
      .post("/auth/login", {
        email: email,
        password: senha,
      })
      .then((data) => {
        const user = data.data as { access_token: string; usuario: IUsuario };

        setCookie(authToken.nome, user.access_token);
        dispatchAppContext({ payload: user.usuario, type: "SET_USUARIO" });
        toast({
          title: "Login realizado com sucesso!",
          status: "success",
          isClosable: true,
        });
        router.push("/feed");
      })
      .catch((err) => {
        const error = err.response.data as AxiosError<{
          statusCode: number;
          message: string;
        }>;
        toast({ title: error.message, status: "error", isClosable: true });
      });
    setIsLoading(false);
  };

  useEffect(() => {
    setErrors([]);
  }, [senha, email]);

  return (
    <Box
      bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
      height={"80vh"}
      py={"40px"}
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
            Login
          </Heading>
          <Flex direction={"column"} gap={"30px"}>
            <InputForm
              onKeyDown={(e) => {
                if (e.key === "Enter") loginSubmit();
              }}
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              messageError={errors.find((e) => e.field === "email")?.message}
            />
            <Flex direction={"column"} gap={"5px"}>
              <InputPassword
                onKeyDown={(e) => {
                  if (e.key === "Enter") loginSubmit();
                }}
                placeholder="Senha"
                onChange={(e) => setSenha(e.target.value)}
                messageError={errors.find((e) => e.field === "senha")?.message}
              />
              <Link
                fontSize={"14px"}
                alignSelf={"flex-end"}
                color={"#DFC3FD"}
                fontWeight={"medium"}
                href={"/esqueci-senha"}
              >
                Esqueci a Senha
              </Link>
            </Flex>
            <Box textAlign={"center"}>
              <ButtonPrimary
                onClick={() => loginSubmit()}
                buttonText="Acessar"
                isLoading={isLoading}
                loadingText="Acessando"
              />
              <Link
                href={"/cadastro"}
                fontSize={"18px"}
                color={"white"}
                fontWeight={"semibold"}
              >
                Cadastre-se agora
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login;
