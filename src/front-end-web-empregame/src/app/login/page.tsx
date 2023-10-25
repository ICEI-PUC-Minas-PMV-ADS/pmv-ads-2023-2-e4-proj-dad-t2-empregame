"use client";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import { Link } from "@chakra-ui/next-js";
import { InputForm } from "@/components/input-form";
import { useState } from "react";
import { ButtonPrimary } from "@/components/button-primary";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  return (
    <main>
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
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Flex direction={"column"} gap={"5px"}>
                <InputForm
                  placeholder="Senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <Link
                  fontSize={"14px"}
                  alignSelf={"flex-end"}
                  color={"#DFC3FD"}
                  fontWeight={"medium"}
                  href={""}
                >
                  Esqueci a Senha
                </Link>
              </Flex>
              <Box textAlign={"center"}>
                <ButtonPrimary onClick={() => {}} buttonText="Acessar" />
                <Link
                  href={""}
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
    </main>
  );
};

export default Login;
