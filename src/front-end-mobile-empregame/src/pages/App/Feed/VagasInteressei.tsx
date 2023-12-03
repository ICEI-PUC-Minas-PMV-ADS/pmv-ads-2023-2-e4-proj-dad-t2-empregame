import {
  Box,
  FlatList,
  HStack,
  Input,
  Select,
  Spinner,
  VStack,
  View,
} from "native-base";
import CardVaga from "../../../components/card-vaga";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../utils/hooks/useFetch";
import { IVaga } from "../../../interface/IVaga";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/auth";
import { RefreshControl } from "react-native";
import { IconLupa } from "../../../components/icons";
import { SelectSecondary } from "../../../components/select-secondary";

export const VagasInteressei = ({ navigation }: any) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const setHardskillFilter = new Set();
  const setSoftskillFilter = new Set();
  const [pesquisa, setPesquisa] = useState<string | null>(null);
  const [hardskill, setHardskill] = useState<string | null>(null);
  const [softskill, setSoftskill] = useState<string | null>(null);

  const {
    data: vagas,
    refetch,
    isFetching,
  } = useFetch<IVaga[]>("/vagas", {
    params: { pesquisa, hardskill, softskill, situacao: "ATIVO" },
    itensRefresh: [pesquisa, hardskill, softskill],
    onError: (err) => {
      if (err.response?.data)
        Toast.show({ text1: err.response.data.message, type: "error" });
    },
  });

  const vagasFiltradas = vagas?.filter((e) =>
    e.vaga_candidato?.find((v) => v.id_usuario === user?.id)
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { data: hardskills } = useFetch<IHardskill[]>("/hardskills", {
    onError: (err) => {
      if (err.response?.data)
        Toast.show({ text1: err.response.data.message, type: "error" });
    },
  });

  const filterHardskills = hardskills?.filter((hardskill) => {
    const duplicatedHardskills = setHardskillFilter.has(hardskill.nome);
    setHardskillFilter.add(hardskill.nome);
    return !duplicatedHardskills;
  });

  const { data: softskills } = useFetch<ISoftskill[]>("/softskills", {
    onError: (err) => {
      if (err.response?.data)
        Toast.show({ text1: err.response.data.message, type: "error" });
    },
  });

  const filterSoftskills = softskills?.filter((softskill) => {
    const duplicatedSoftskills = setSoftskillFilter.has(softskill.nome);
    setSoftskillFilter.add(softskill.nome);
    return !duplicatedSoftskills;
  });

  return (
    <View flex={1}>
      <VStack space={"18px"} paddingX={"15px"} paddingY={"20px"}>
        <Input
          fontFamily={"Outfit-500"}
          placeholder={"Pesquisar Vaga"}
          onChangeText={(e) => setPesquisa(e)}
          py={"10px"}
          px={"25px"}
          placeholderTextColor={"#ADADAD"}
          color={"#2E2E2E"}
          backgroundColor={"white"}
          rounded={"full"}
          fontSize={"16px"}
          fontWeight={"medium"}
          InputRightElement={
            <Box paddingRight={"20px"}>
              <IconLupa />
            </Box>
          }
        />
        <HStack space={"10px"}>
          <SelectSecondary
            placeholder="Hardskill"
            onValueChange={(e) => setHardskill(e)}
          >
            {filterHardskills?.map((hardskill) => (
              <Select.Item
                key={hardskill.id + hardskill.nome}
                value={hardskill.nome}
                label={hardskill.nome}
              />
            ))}
          </SelectSecondary>
          <SelectSecondary
            placeholder="SoftSkill"
            onValueChange={(e) => setSoftskill(e)}
          >
            {filterSoftskills?.map((softskill) => (
              <Select.Item
                key={softskill.id + softskill.nome}
                value={softskill.nome}
                label={softskill.nome}
              />
            ))}
          </SelectSecondary>
        </HStack>
      </VStack>
      {isFetching == true ? (
        <View flex={1} justifyContent={"center"}>
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          ItemSeparatorComponent={() => <Box h={"20px"} />}
          paddingX={"15px"}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => <View height={210}></View>}
          data={vagasFiltradas}
          keyExtractor={() => (Math.random() * 100).toString()}
          renderItem={({ item }) => {
            return (
              <CardVaga
                vaga={item}
                refetch={() => refetch}
                onPressChat={() => navigation.navigate("Chat")}
                onPressUsuario={() =>
                  navigation.navigate("Perfil", { idusuario: item.id_usuario })
                }
              />
            );
          }}
        />
      )}
    </View>
  );
};
