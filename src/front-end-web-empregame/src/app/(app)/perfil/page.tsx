"use client";

import {
  Box,
  Text,
  Image,
  Button,
  Container,
  Flex,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";

const Perfil = () => {
  return (
    <Box
      bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
      py={"40px"}
    >
      <Container maxW={"1366px"} h={"full"} paddingY={"70px"}>
        <Flex
          justifyContent={"space-between"}
          gap={"40px"}
          width={"100%"}
          marginBottom={"75px"}
        >
          <Button
            bg={"none"}
            gap={"10px"}
            color={"white"}
            _hover={{ bg: "#6d3bbf" }}
            rounded={"full"}
          >
            <Image src={"./icons/icon-back.svg"} alt="icone voltar"></Image>
            Voltar
          </Button>
          <Flex gap={"40px"}>
            <Button
              bg={"none"}
              gap={"10px"}
              color={"white"}
              _hover={{ bg: "#6d3bbf" }}
              rounded={"full"}
            >
              <Image src={"./icons/icon-edit.svg"} alt="icone editar"></Image>
              Editar informações
            </Button>
            <Button
              bg={"none"}
              gap={"10px"}
              color={"white"}
              _hover={{ bg: "#6d3bbf" }}
              rounded={"full"}
            >
              <Image
                src={"./icons/icon-password.svg"}
                alt="icone senha"
              ></Image>
              Alterar senha
            </Button>
            <Button
              bg={"none"}
              gap={"10px"}
              color={"white"}
              _hover={{ bg: "#6d3bbf" }}
              rounded={"full"}
            >
              <Image
                src={"./icons/icon-delete.svg"}
                alt="icone deletar"
              ></Image>
              Excluir conta
            </Button>
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"32px"} width={"100%"}>
          <Flex gap={"15px"} direction={"column"}>
            <Text color={"white"} fontWeight={"semibold"} fontSize={"48px"}>
              Mariano Contin
            </Text>
            <Box
              bg={"#5a2da4"}
              textColor={"white"}
              fontSize={"16px"}
              fontWeight={"semibold"}
              padding={"8px 25px"}
              rounded={"full"}
              maxWidth={"200px"}
              textAlign={"center"}
            >
              Candidato
            </Box>
          </Flex>
          <Divider></Divider>
          <SimpleGrid columns={5} spacing={"20px"}>
            <Box color={"white"} fontSize={"16px"}>
              <Text fontWeight={"normal"}>Telefone</Text>
              <Text fontWeight={"semibold"}>005532998510205</Text>
            </Box>
            <Box color={"white"} fontSize={"16px"}>
              <Text fontWeight={"normal"}>E-mail</Text>
              <Text fontWeight={"semibold"}>mariano.contin@bol.com.br</Text>
            </Box>
            <Box color={"white"} fontSize={"16px"}>
              <Text fontWeight={"normal"}>GitHub</Text>
              <Text
                fontWeight={"semibold"}
                display={"flex"}
                alignItems={"center"}
              >
                github.com/mariano.contin{" "}
                <Image
                  src="./icons/icon-share.svg"
                  alt="icon redirecionavel"
                  paddingLeft={"10px"}
                ></Image>
              </Text>
            </Box>
            <Box color={"white"} fontSize={"16px"}>
              <Text fontWeight={"normal"}>Portifólio</Text>
              <Text
                fontWeight={"semibold"}
                display={"flex"}
                alignItems={"center"}
              >
                marianodev.com.br{" "}
                <Image
                  src="./icons/icon-share.svg"
                  alt="icon redirecionavel"
                  paddingLeft={"10px"}
                ></Image>
              </Text>
            </Box>
            <Box color={"white"} fontSize={"16px"}>
              <Text fontWeight={"normal"}>LikedIn</Text>
              <Text
                fontWeight={"semibold"}
                display={"flex"}
                alignItems={"center"}
              >
                linkedin.com/marianocontin{" "}
                <Image
                  src="./icons/icon-share.svg"
                  alt="icon redirecionavel"
                  paddingLeft={"10px"}
                ></Image>
              </Text>
            </Box>
          </SimpleGrid>
          <Divider></Divider>
          <Flex gap={"45px"}>
            <Box width={"full"}>
              <Text color={"white"} fontSize={"16px"} paddingBottom={"5px"}>
                Hardskills
              </Text>
              <SimpleGrid columns={2} spacing={"12px"}>
                <Flex
                  direction={"column"}
                  bg={"#6D3BBF"}
                  rounded={"12px"}
                  py={"12px"}
                  px={"20px"}
                  width={"full"}
                  gap={"8px"}
                >
                  <Text fontSize={"16px"} fontWeight={"medium"} color={"white"}>
                    JavaScript
                  </Text>

                  <Flex gap={"8px"}>
                    {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <label key={index}>
                          <IconStar
                            fill={currentRating <= 3 ? "#FFB800" : "white"}
                          />
                        </label>
                      );
                    })}
                  </Flex>
                </Flex>
              </SimpleGrid>
            </Box>
            <Box width={"full"}>
              <Text color={"white"} fontSize={"16px"} paddingBottom={"5px"}>
                Softskills
              </Text>
              <SimpleGrid columns={2} spacing={"12px"}>
                <Flex
                  direction={"column"}
                  bg={"#6D3BBF"}
                  rounded={"12px"}
                  py={"12px"}
                  px={"20px"}
                  width={"full"}
                  gap={"8px"}
                >
                  <Text fontSize={"16px"} fontWeight={"medium"} color={"white"}>
                    Liderança
                  </Text>

                  <Flex gap={"8px"}>
                    {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <label key={index}>
                          <IconStar
                            fill={currentRating <= 3 ? "#FFB800" : "white"}
                          />
                        </label>
                      );
                    })}
                  </Flex>
                </Flex>
              </SimpleGrid>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Perfil;

const IconStar = (props: { fill: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
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
