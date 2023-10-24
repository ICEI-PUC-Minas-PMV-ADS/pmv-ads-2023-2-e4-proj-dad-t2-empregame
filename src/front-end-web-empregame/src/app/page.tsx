"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <header>
        <Container maxW={"1366px"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            height={"140px"}
          >
            <Image src="./logo-empregame.svg" />

            <Flex gap={"70px"} alignItems={"center"}>
              <Link
                color={"#7345D6"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                href={""}
                _hover={{ color: "#2E2E2E", transition: "ease-in" }}
              >
                Home
              </Link>
              <Link
                color={"#7345D6"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                href={""}
                _hover={{ color: "#2E2E2E", transition: "ease-in" }}
              >
                Sobre
              </Link>
              <Link
                color={"#7345D6"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                href={""}
                _hover={{ color: "#2E2E2E", transition: "ease-in" }}
              >
                Contato
              </Link>
              <Divider
                orientation="vertical"
                w={"1px"}
                height={"40px"}
                bg={"#B3B3B3"}
              />
              <Link
                color={"#7345D6"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                _hover={{ color: "#2E2E2E", transition: "ease-in" }}
                href={""}
              >
                Cadastre-se
              </Link>
              <Link
                color={"white"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                href={""}
                bg={"#7345D6"}
                rounded={"full"}
                py={"10px"}
                px={"50px"}
                _hover={{
                  bg: "#2E2E2E",
                  transition: "ease-in",
                  boxShadow: "lg",
                }}
              >
                Login
              </Link>
            </Flex>
          </Flex>
        </Container>
      </header>
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
            gap={"100px"}
          >
            <Box>
              <Heading
                textColor={"white"}
                fontSize={"85px"}
                fontWeight={"semibold"}
                mb={"50px"}
              >
                Eleifend quam adipiscing vitae proin
              </Heading>
              <Link
                color={"#7345D6"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                href={""}
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
                Experimente agora
              </Link>
            </Box>
            <Image height={"600px"} src="./home-img-1.svg" />
          </Container>
        </Box>
      </section>
    </main>
  );
}
