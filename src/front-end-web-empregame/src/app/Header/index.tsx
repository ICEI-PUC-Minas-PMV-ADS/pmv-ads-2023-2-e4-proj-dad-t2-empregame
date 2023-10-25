import { Link } from "@chakra-ui/next-js";
import { Container, Divider, Flex, Image } from "@chakra-ui/react";

export const Header = () => {
  return (
    <header id="home">
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
              href={"#home"}
              _hover={{ color: "#2E2E2E", transition: "ease-in" }}
            >
              Home
            </Link>
            <Link
              color={"#7345D6"}
              fontSize={"16px"}
              fontWeight={"semibold"}
              href={"#sobre-nos"}
              _hover={{ color: "#2E2E2E", transition: "ease-in" }}
            >
              Sobre
            </Link>
            <Link
              color={"#7345D6"}
              fontSize={"16px"}
              fontWeight={"semibold"}
              href={"#contato"}
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
              href={"/login"}
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
  );
};
