import { Button, View } from "native-base";
import { Text } from "react-native-svg";
import { useAuth } from "../context/auth";

export const Feed = () => {
  const { deslogarSubmit } = useAuth();
  return (
    <View flex={1} justifyContent={"center"}>
      <Text>Feed</Text>
      <Button onPress={() => deslogarSubmit()}>Deslogar</Button>
    </View>
  );
};
