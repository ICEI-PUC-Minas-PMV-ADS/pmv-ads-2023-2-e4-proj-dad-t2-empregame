"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  useToast,
  Text,
  PinInput,
  PinInputField,
  HStack,
  Button,
} from "@chakra-ui/react";

import { InputForm } from "@/components/input-form";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/components/button-primary";
import { api } from "@/utils/services/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { InputPassword } from "@/components/input-password";
import { isEmail } from "@/utils/validator/isEmail";

const EsqueciSenha = () => {
  const toast = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const submitResetSenha = async () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (step === 1 && !email)
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail",
      });

    if (step === 1 && !isEmail(email))
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail corretamente",
      });

    if (step === 2 && !codigo)
      erros.push({
        field: "codigo",
        message: "Preencha o campo Código",
      });

    if (step === 2 && !senha)
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
      .post("/auth/redefinir-senha", {
        email: email,
        codigo: codigo ? codigo : "",
        senha: senha ? senha : "",
      })
      .then(() => {
        if (!codigo && !senha) {
          toast({
            title: "Email enviado",
            status: "success",
          });
          setStep(2);
        } else {
          toast({
            title: "Senha atualizada com sucesso!",
            status: "success",
          });
          router.push("/login");
        }
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

  const reenviarResetSenha = async () => {
    await api
      .post("/auth/redefinir-senha", {
        email: email,
      })
      .then(() => {
        toast({
          title: "Email enviado",
          status: "success",
        });
      })
      .catch((err) => {
        const error = err.response.data as AxiosError<{
          statusCode: number;
          message: string;
        }>;
        toast({ title: error.message, status: "error", isClosable: true });
      });
  };

  useEffect(() => {
    setErrors([]);
  }, [senha, email, codigo]);

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
            Esqueci a Senha
          </Heading>
          <Flex direction={"column"} gap={"20px"}>
            {step === 1 && (
              <Box>
                <Text
                  fontWeight={"semibold"}
                  color={"white"}
                  paddingBottom={"20px"}
                >
                  Informe o e-mail de sua conta
                </Text>
                <InputForm
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  messageError={
                    errors.find((e) => e.field === "email")?.message
                  }
                />
              </Box>
            )}
            {step === 2 && (
              <Flex direction={"column"} gap={"20px"}>
                <Text fontWeight={"semibold"} color={"white"}>
                  Informe o código que recebeu no e-mail e a nova senha
                </Text>
                <Text fontWeight={"semibold"} color={"white"}>
                  Não chegou?
                  <Button
                    bg={"none"}
                    color={"white"}
                    _hover={{
                      bg: "none",
                      textDecorationLine: "underline",
                    }}
                    onClick={() => reenviarResetSenha()}
                  >
                    Reenviar código
                  </Button>
                </Text>
                <Flex flexDirection={"column"}>
                  <HStack w={"full"} display={"flex"} justifyContent={"center"}>
                    <PinInput
                      onChange={(e) => setCodigo(e)}
                      placeholder="0"
                      size={"lg"}
                    >
                      <PinInputField bg={"white"} />
                      <PinInputField bg={"white"} />
                      <PinInputField bg={"white"} />
                      <PinInputField bg={"white"} />
                      <PinInputField bg={"white"} />
                      <PinInputField bg={"white"} />
                    </PinInput>
                  </HStack>
                  <Text color={"red.400"} fontSize={"14px"}>
                    {errors.find((e) => e.field === "codigo")?.message}
                  </Text>
                </Flex>
                <InputPassword
                  placeholder="Nova senha"
                  onChange={(e) => setSenha(e.target.value)}
                  messageError={
                    errors.find((e) => e.field === "senha")?.message
                  }
                />
              </Flex>
            )}
            <Box textAlign={"center"}>
              <ButtonPrimary
                onClick={() => submitResetSenha()}
                buttonText="Enviar"
                isLoading={isLoading}
                loadingText="Enviando"
              />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default EsqueciSenha;
