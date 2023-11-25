import { FlatList, Spinner, View } from "native-base";
import CardVaga from "../../../components/card-vaga";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../utils/hooks/useFetch";
import { IVaga } from "../../../interface/IVaga";
import Toast from "react-native-toast-message";
import { RefreshControl } from "react-native";

export const Feed = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, []);

  return (
    <View flex={1}>
      {isFetching == true ? (
        <View flex={1} justifyContent={"center"}>
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          paddingX={"15px"}
          paddingTop={"20px"}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => <View height={210}></View>}
          data={vagas}
          keyExtractor={() => (Math.random() * 100).toString()}
          renderItem={({ item }) => {
            return (
              <CardVaga
                vaga={item}
                refetch={() => refetch}
                onPressChat={() => navigation.navigate("Chat")}
                onPressUsuario={() =>
                  navigation.navigate("Perfil", { idusuario: item.id })
                }
              />
            );
          }}
        />
      )}
    </View>
  );
};
