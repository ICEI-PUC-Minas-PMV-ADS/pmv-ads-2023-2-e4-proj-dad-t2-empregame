import { useAuth } from "../../../context/auth";
import { IMensagem } from "../../../interface/IMensagem";
import { IVagaCandidato } from "../../../interface/IVaga";
import { useFetch } from "../../../utils/hooks/useFetch";
import { useState } from "react";
import { useMutation } from "../../../utils/hooks/useMutation";
import Toast from "react-native-toast-message";
import {
  Box,
  Button,
  HStack,
  Input,
  Link,
  ScrollView,
  Text,
  VStack,
} from "native-base";

export const Chat = (props: { match?: IVagaCandidato }) => {
  const { user } = useAuth();

  const [newMensagem, setNewMensagem] = useState<string>("");

  const { data: mensagens, refetch } = useFetch<IMensagem[]>(
    "/mensagens/" + props.match?.id
    // { interval: 1000, enable: isOpen }
  );

  const { mutate: mutateNovaMensagem, isFetching: isFetchingNovaMensagem } =
    useMutation<IMensagem>("/mensagens", {
      method: "POST",
      onSuccess: () => {
        refetch();
        setNewMensagem("");
      },
      onError: (err) => {
        Toast.show({ text1: err.message, type: "error" });
      },
    });

  return (
    <ScrollView flex={1} paddingX={"15px"} paddingTop={"20px"}>
      <Box>
        <Text color={"#5A2DA4"} fontWeight={"bold"} fontSize={"20px"}>
          {props.match?.vaga?.nome}
        </Text>
        <Text color={"#606060"} fontWeight={"regular"} fontSize={"16px"}>
          Conversando com{" "}
          {user?.id === props.match?.id_usuario ? (
            <Link href={"/perfil?id=" + props.match?.vaga?.usuario.id}>
              {props.match?.vaga?.usuario.nome}
            </Link>
          ) : (
            <Link href={"/perfil?id=" + props.match?.usuario?.id}>
              {props.match?.usuario?.nome}
            </Link>
          )}
        </Text>
      </Box>

      <VStack direction={"column"} space={"30px"}>
        <VStack
          direction={"column"}
          space={"10px"}
          overflow={"auto"}
          maxH={"600px"}
        >
          {mensagens?.map((msg) => (
            <Box
              key={msg.id}
              maxW={"80%"}
              alignSelf={
                msg.id_usuario === user?.id ? "flex-end" : "flex-start"
              }
              bg={msg.id_usuario === user?.id ? "#6D3BBF" : "#F1E9FF"}
              px={"15px"}
              py={"10px"}
              color={msg.id_usuario === user?.id ? "white" : "#2E2E2E"}
              fontSize={"14px"}
              fontWeight={"medium"}
              rounded={
                msg.id_usuario === user?.id
                  ? "11px 11px 0px 11px"
                  : "11px 11px 11px 0px"
              }
              textAlign={msg.id_usuario === user?.id ? "right" : "left"}
            >
              {msg.conteudo}
            </Box>
          ))}
        </VStack>

        <HStack space={"10px"} w={"full"}>
          <Input
            rounded={"full"}
            borderWidth={"1px"}
            borderColor={"#2E2E2E"}
            placeholder={"Digite aqui"}
            onChangeText={(e) => setNewMensagem(e)}
            flex={1}
          ></Input>
          <Button
            rounded={"full"}
            bg={"#5A2DA4"}
            py={"10px"}
            px={"25px"}
            color={"white"}
            fontSize={"16px"}
            fontWeight={"regular"}
            onPress={() => {
              mutateNovaMensagem({
                conteudo: newMensagem,
                id_usuario: user?.id,
                id_vaga_candidato: props.match?.id,
              });
            }}
          >
            Enviar
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};
