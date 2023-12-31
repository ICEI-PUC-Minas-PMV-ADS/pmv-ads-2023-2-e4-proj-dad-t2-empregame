import { useRoute } from "@react-navigation/native";
import { IUsuario } from "../interface/IUsuario";
import {
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { IconCandidato, IconLink2 } from "./icons";
import { GestureResponderEvent } from "react-native";

const CardCandidato = (props: {
  candidato: IUsuario;
  onPressUsuario: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  return (
    <VStack
      direction={"column"}
      w={"full"}
      py={"20px"}
      px={"20px"}
      space={"25px"}
      borderWidth={"1px"}
      borderColor={"#E1E1E1"}
      rounded={"13px"}
      bg={"white"}
    >
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <HStack space={"15px"} alignItems={"center"}>
          <IconCandidato />
          <Text
            fontSize={"20px"}
            fontWeight={"bold"}
            color={"#5A2DA4"}
            maxW={"180px"}
          >
            {props.candidato.nome}
          </Text>
        </HStack>
        <Pressable onPress={props.onPressUsuario}>
          <HStack
            space={"10px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              fontFamily={"Outfit-600"}
              color={"#2E2E2E"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Ver Perfil
            </Text>
            <IconLink2 />
          </HStack>
        </Pressable>
      </HStack>
      <HStack space={"8px"} flexWrap={"wrap"}>
        {props.candidato.usuario_hardskill?.map((hardskill) => (
          <Box
            key={hardskill.id}
            bg={"#5A2DA4"}
            py={"5px"}
            px={"10px"}
            rounded={"full"}
            mb={"10px"}
          >
            <Text
              fontSize={"14px"}
              color={"white"}
              fontWeight={"medium"}
              textAlign={"center"}
            >
              {hardskill?.hardskill?.nome}
            </Text>
          </Box>
        ))}
        {props.candidato.usuario_softskill?.map((softskill) => (
          <Box
            key={softskill.id}
            bg={"#5A2DA4"}
            py={"5px"}
            px={"10px"}
            rounded={"full"}
            mb={"10px"}
          >
            <Text
              fontSize={"14px"}
              color={"white"}
              fontWeight={"medium"}
              textAlign={"center"}
            >
              {softskill?.softskill?.nome}
            </Text>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default CardCandidato;
