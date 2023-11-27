import {
  Box,
  Button,
  FlatList,
  HStack,
  Modal,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useCallback, useState } from "react";
import {
  IconCoracao,
  IconInteressei,
} from "../../../../components/icons";
import { IVagaCandidato } from "../../../../interface/IVaga";
import { useFetch } from "../../../../utils/hooks/useFetch";
import { api } from "../../../../utils/services/api";
import { RefreshControl } from "react-native";
import { Chat } from "../Chat";

export const CandidatosInteressados = (props: {
  qtdCandidatosInteressados: number | undefined;
  idVaga: number | undefined;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: candidatosInteressados,
    refetch: refetchList,
    isFetching,
  } = useFetch<IVagaCandidato[]>("/vagas/match/" + props.idVaga);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchList();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
            <View flex={1}>
              {isFetching ? (
                <View flex={1} justifyContent={"center"}>
                  <Spinner size="lg" />
                </View>
              ) : (
                <FlatList
                  ItemSeparatorComponent={() => <Box h={"20px"} />}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  ListFooterComponent={() => <View height={210}></View>}
                  data={candidatosInteressados}
                  keyExtractor={() => (Math.random() * 100).toString()}
                  renderItem={({ item }) => {
                    return (
                      <VStack
                        key={item.id}
                        borderRadius={"10px"}
                        bg={"#F6F0FF"}
                        py={"20px"}
                        px={"25px"}
                        space={"15px"}
                      >
                        <HStack
                          space={"5px"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text
                            fontFamily={"Outfit-600"}
                            color={"#2E2E2E"}
                            fontWeight={"bold"}
                            fontSize={"18px"}
                          >
                            {item.usuario?.nome}
                          </Text>
                        </HStack>
                        <VStack space={"10px"}>
                          {item.match === true && <Chat match={item} />}

                          <Button
                            onPress={() => {
                              if (item.match === false) {
                                api
                                  .patch("/vagas/match/" + item.id, {
                                    match: true,
                                  })
                                  .then(() => {
                                    refetchList();
                                  });
                              } else {
                                api
                                  .patch("/vagas/match/" + item.id, {
                                    match: false,
                                  })
                                  .then(() => {
                                    refetchList();
                                  });
                              }
                            }}
                            bg={item.match === true ? "#5A2DA4" : "white"}
                            borderColor={"#5A2DA4"}
                            borderWidth={"2px"}
                            rounded={"full"}
                            py={"8px"}
                            px={"25px"}
                            w={"full"}
                          >
                            <HStack space={"10px"} alignItems={"center"}>
                              <Text
                                fontFamily={"Outfit-500"}
                                color={
                                  item.match === true ? "white" : "#5A2DA4"
                                }
                                fontSize={"18px"}
                                fontWeight={"semibold"}
                                textAlign={"center"}
                              >
                                Interessei
                              </Text>
                              <IconInteressei
                                fill={item.match === true ? "white" : "#5A2DA4"}
                              />
                            </HStack>
                          </Button>
                        </VStack>
                      </VStack>
                    );
                  }}
                />
              )}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
