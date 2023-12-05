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
  Modal,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";

export const Chat = (props: { match?: IVagaCandidato }, router: any) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const [newMensagem, setNewMensagem] = useState<string>("");

  const { data: mensagens, refetch } = useFetch<IMensagem[]>(
    "/mensagens/" + props.match?.id,
    { delay: 1000, enable: showModal }
  );

  const { mutate: mutateNovaMensagem, isFetching: isFetchingNovaMensagem } =
    useMutation<IMensagem>("/mensagens", {
      method: "POST",
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        Toast.show({ text1: err.message, type: "error" });
      },
    });
  return (
    <>
      <Button
        onPress={() => setShowModal(true)}
        bg={"white"}
        borderColor={"#6D3BBF"}
        borderWidth={"2px"}
        rounded={"full"}
        py={"10px"}
        px={"25px"}
        flex={1}
      >
        <HStack space={"10px"} alignItems={"center"}>
          <Text
            fontFamily={"Outfit-500"}
            color={"#6D3BBF"}
            fontSize={"18px"}
            fontWeight={"semibold"}
            textAlign={"center"}
          >
            Chat
          </Text>
        </HStack>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"xl"}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Box>
              <Text color={"#5A2DA4"} fontWeight={"bold"} fontSize={"20px"}>
                {props.match?.vaga?.nome}
              </Text>
              <Text>
                {user?.id === props.match?.id_usuario ? (
                  <Text
                    color={"#606060"}
                    fontWeight={"regular"}
                    fontFamily={"Outfit-600"}
                  >
                    Conversando com {props.match?.vaga?.usuario.nome}
                  </Text>
                ) : (
                  <Text
                    color={"#606060"}
                    fontWeight={"regular"}
                    fontFamily={"Outfit-600"}
                  >
                    Conversando com {props.match?.usuario?.nome}
                  </Text>
                )}
              </Text>
            </Box>
          </Modal.Header>
          <Modal.Body>
            <VStack space={"10px"}>
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
                  rounded={
                    msg.id_usuario === user?.id
                      ? "11px 11px 0px 11px"
                      : "11px 11px 11px 0px"
                  }
                >
                  <Text
                    fontFamily={"Outfit-500"}
                    color={msg.id_usuario === user?.id ? "white" : "#2E2E2E"}
                    fontSize={"14px"}
                    fontWeight={"medium"}
                    textAlign={msg.id_usuario === user?.id ? "right" : "left"}
                  >
                    {msg.conteudo}
                  </Text>
                </Box>
              ))}
              {isFetchingNovaMensagem && (
                <View py={"15px"} justifyContent={"center"}>
                  <Spinner size="lg" />
                </View>
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack space={"10px"} w={"full"}>
              <Input
                rounded={"full"}
                borderWidth={"1px"}
                borderColor={"#2E2E2E"}
                placeholder={"Digite aqui"}
                onChangeText={(e) => setNewMensagem(e)}
                value={newMensagem}
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
                isLoading={isFetchingNovaMensagem}
                isLoadingText="Enviando"
                onPress={() => {
                  if (newMensagem) {
                    mutateNovaMensagem({
                      conteudo: newMensagem,
                      id_usuario: user?.id,
                      id_vaga_candidato: props.match?.id,
                    });
                    setNewMensagem("");
                  }
                }}
              >
                Enviar
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
