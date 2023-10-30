"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <section>
        <Box
          bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
          height={"full"}
          py={"40px"}
        >
          <Container
            maxW={"1366px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"50px"}
          >
            <Box>
              <Heading
                textColor={"white"}
                fontSize={"60px"}
                fontWeight={"bold"}
                mb={"15px"}
              >
                Transforme sua paixão por tecnologia em carreira
              </Heading>
              <Text
                textColor={"white"}
                fontSize={"35px"}
                fontWeight={"normal"}
                mb={"30px"}
              >
                Sua jornada começa aqui
              </Text>
              <Link
                color={"#7345D6"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                href={"/cadastro"}
                bg={"white"}
                rounded={"full"}
                py={"10px"}
                px={"50px"}
                _hover={{
                  bg: "#2E2E2E",
                  color: "white",
                  transition: "ease-in",
                  boxShadow: "lg",
                }}
              >
                Cadastre-se agora
              </Link>
            </Box>
            <Image height={"600px"} src="./home-img-1.svg" alt="imagem site" />
          </Container>
        </Box>
      </section>
      <section id="sobre-nos">
        <Box
          bgImage={"url('./home-img-3.svg')"}
          bgRepeat={"no-repeat"}
          py={"80px"}
        >
          <Container
            maxW={"1366px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"100px"}
          >
            <Image src="./home-img-2.svg" alt="imagem site" />
            <Box>
              <Heading
                fontSize={"60px"}
                color={"#7345D6"}
                fontWeight={"bold"}
                pb={"25px"}
              >
                Sobre nós
              </Heading>
              <Text fontSize={"24px"} fontWeight={"medium"} color={"#2E2E2E"}>
                Bem-vindo à EmpregaMe, onde a inovação e a busca por talento se
                encontram! Somos uma plataforma líder no mercado, focada em unir
                recrutadores e candidatos em busca de oportunidades na
                empolgante indústria da tecnologia. Aqui, a nossa missão é
                simples, mas poderosa: tornar a busca por empregos na área de
                tecnologia mais eficiente, eficaz e gratificante para todos os
                envolvidos.
              </Text>
            </Box>
          </Container>
        </Box>
      </section>
      <section id="contato">
        <Box
          bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
          height={"full"}
        >
          <Container
            maxW={"1366px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"100px"}
          >
            <Flex direction={"column"} gap={"60px"} py={"80px"}>
              <Box>
                <Heading fontSize={"60px"} fontWeight={"bold"} color={"white"}>
                  Dúvidas?
                </Heading>
                <Text fontSize={"30px"} fontWeight={"normal"} color={"white"}>
                  Entre em contato conosco
                </Text>
              </Box>
              <Flex direction={"column"} gap={"25px"}>
                <Flex gap={"20px"} alignItems={"center"}>
                  <Image src="./home-icon-email.svg" alt="imagem site" />
                  <Text fontSize={"20px"} fontWeight={"normal"} color={"white"}>
                    suporte@empregame.com.br
                  </Text>
                </Flex>
                <Flex gap={"20px"} alignItems={"center"}>
                  <Image src="./home-icon-telefone.svg" alt="imagem site" />
                  <Text fontSize={"20px"} fontWeight={"normal"} color={"white"}>
                    (35)99999-9999
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Image
              src="./home-img-4.svg"
              alignSelf={"end"}
              bottom={"-8px"}
              position={"relative"}
              alt="imagem site"
            />
          </Container>
        </Box>
      </section>
    </>
  );
}
