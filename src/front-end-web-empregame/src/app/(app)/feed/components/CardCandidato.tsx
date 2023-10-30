import { IUsuario } from "@/interface/IUsuario";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const CardCandidato = (props: { candidato: IUsuario }) => {
  const router = useRouter();
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
      <Flex justifyContent={"space-between"}>
        <Flex gap={"15px"} alignItems={"center"}>
          <Image src={"../../icons/icon-candidato.svg"} alt={"candidato"} />
          <Text fontSize={"20px"} fontWeight={"bold"} color={"#5A2DA4"}>
            {props.candidato.nome}
          </Text>
        </Flex>
        <Button
          onClick={() => router.push("/perfil?id=" + props.candidato.id)}
          gap={"10px"}
          color={"#2E2E2E"}
          bg={"none"}
          rounded={"full"}
        >
          Ver perfil
          <Image src={"../../icons/icon-export.svg"} alt={"export"} />{" "}
        </Button>
      </Flex>

      <Flex gap={"8px"} alignItems={"center"}>
        {props.candidato.usuario_hardskill?.map((hardskill) => (
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
            {hardskill.hardskill.nome}
          </Box>
        ))}
        {props.candidato.usuario_softskill?.map((softskill) => (
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
            {softskill.softskill.nome}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default CardCandidato;
