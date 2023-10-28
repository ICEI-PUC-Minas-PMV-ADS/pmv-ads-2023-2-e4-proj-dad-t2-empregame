import { Box, Flex, Image, Text } from "@chakra-ui/react";

const CardCandidato = () => {
  return (
    <Flex
      direction={"column"}
      w={"full"}
      py={"25px"}
      px={"30px"}
      gap={"25px"}
      borderWidth={"1px"}
      borderColor={"#E1E1E1"}
      rounded={"13px"}
      bg={"white"}
    >
      <Flex gap={"15px"} alignItems={"center"}>
        <Image src={"./icons/icon-maleta.svg"} alt={"maleta"} />
        <Text fontSize={"20px"} fontWeight={"bold"} color={"#2E2E2E"}>
          Vaga de Dev FrontEnd Júnior
        </Text>
      </Flex>
      <Flex gap={"8px"} alignItems={"center"}>
        <Box
          bg={"#5A2DA4"}
          py={"5px"}
          px={"10px"}
          fontSize={"14px"}
          color={"white"}
          fontWeight={"medium"}
          textAlign={"center"}
          rounded={"full"}
        >
          Java
        </Box>
        <Box
          bg={"#5A2DA4"}
          py={"5px"}
          px={"10px"}
          fontSize={"14px"}
          color={"white"}
          fontWeight={"medium"}
          textAlign={"center"}
          rounded={"full"}
        >
          Liderança
        </Box>
      </Flex>
    </Flex>
  );
};

export default CardCandidato;
