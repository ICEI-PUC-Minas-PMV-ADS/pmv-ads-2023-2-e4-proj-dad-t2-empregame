"use client";

import { Container, Text, Image } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <footer>
      <Container
        maxW={"1366px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"100px"}
        py={"50px"}
      >
        <Text>
          Desenvolvido pelo Grupo 4 | Turma 2 | 4° Período ADS | PUC Minas 2023
        </Text>
        <Image src="./logo-empregame.svg" h={"45px"} alt="logo" />
      </Container>
    </footer>
  );
};
