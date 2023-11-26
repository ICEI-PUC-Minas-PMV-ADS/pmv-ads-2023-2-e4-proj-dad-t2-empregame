import { Button, HStack, Modal, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import {
  IconChat,
  IconCoracao,
  IconInteressei,
  IconLink2,
} from "../../../../components/icons";
import { IVagaCandidato } from "../../../../interface/IVaga";
import { useFetch } from "../../../../utils/hooks/useFetch";
import { api } from "../../../../utils/services/api";

export const CandidatosInteressados = (props: {
  qtdCandidatosInteressados: number | undefined;
  idVaga: number | undefined;
  navigation?: any;
}) => {
  const [showModal, setShowModal] = useState(false);

  const { data: candidatosInteressados, refetch: refetchList } = useFetch<
    IVagaCandidato[]
  >("/vagas/match/" + props.idVaga);

  return (
    <>
      <Button
        onPress={() => setShowModal(true)}
        bg={"#6D3BBF"}
        borderColor={"#6D3BBF"}
        borderWidth={"2px"}
        rounded={"full"}
        py={"10px"}
        px={"25px"}
        w={"full"}
      >
        <HStack space={"10px"} alignItems={"center"}>
          <IconCoracao fill={"#FF5757"} borderColor={"#6D3BBF"} />
          <Text
            fontFamily={"Outfit-500"}
            color={"white"}
            textAlign={"center"}
            fontSize={"18px"}
            fontWeight={"semibold"}
          >
            {props.qtdCandidatosInteressados} Candidatos Interessados
          </Text>
        </HStack>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"xl"}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontFamily={"Outfit-600"} color={"#5A2DA4"} fontSize={"18px"}>
              Candidatos Interessados
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack space={"10px"}>
              {candidatosInteressados?.map((candidato) => {
                return (
                  <HStack
                    key={candidato.id}
                    borderRadius={"10px"}
                    bg={"#F6F0FF"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    py={"10px"}
                    px={"18px"}
                  >
                    <VStack space={"5px"}>
                      <Text
                        fontFamily={"Outfit-600"}
                        color={"#2E2E2E"}
                        fontWeight={"bold"}
                        fontSize={"18px"}
                      >
                        {candidato.usuario?.nome}
                      </Text>
                      <Pressable onPress={() => {}}>
                        <HStack space={"10px"}>
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
                    </VStack>
                    <VStack space={"10px"}>
                      {candidato.match === true && (
                        <Button
                          onPress={() => {}}
                          bg={"white"}
                          borderColor={"#6D3BBF"}
                          borderWidth={"2px"}
                          rounded={"full"}
                          py={"10px"}
                          px={"25px"}
                          flex={1}
                        >
                          <HStack space={"10px"} alignItems={"center"}>
                            <IconChat />
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
                      )}

                      <Button
                        onPress={() => {
                          if (candidato.match === false) {
                            api
                              .patch("/vagas/match/" + candidato.id, {
                                match: true,
                              })
                              .then(() => {
                                refetchList();
                              });
                          } else {
                            api
                              .patch("/vagas/match/" + candidato.id, {
                                match: false,
                              })
                              .then(() => {
                                refetchList();
                              });
                          }
                        }}
                        bg={candidato.match === true ? "#5A2DA4" : "white"}
                        borderColor={"#5A2DA4"}
                        borderWidth={"2px"}
                        rounded={"full"}
                        py={"10px"}
                        px={"25px"}
                        w={"full"}
                      >
                        <HStack space={"10px"}>
                          <Text
                            fontFamily={"Outfit-500"}
                            color={
                              candidato.match === true ? "white" : "#5A2DA4"
                            }
                            fontSize={"18px"}
                            fontWeight={"semibold"}
                            textAlign={"center"}
                          >
                            Interessei
                          </Text>
                          <IconInteressei />
                        </HStack>
                      </Button>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
