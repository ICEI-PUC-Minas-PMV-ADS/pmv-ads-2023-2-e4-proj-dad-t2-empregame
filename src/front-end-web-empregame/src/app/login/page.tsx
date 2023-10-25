"use client";

import { Box, Container } from "@chakra-ui/react";
import { Header } from "../Header";
import { Footer } from "../Footer";

const Login = () => {
  return (
    <main>
      <Header />
      <Box
        bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
        height={"100vh"}
        py={"40px"}
      >
        <Container
          maxW={"1366px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        ></Container>
      </Box>
      <Footer />
    </main>
  );
};

export default Login;
