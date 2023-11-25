import { LinearGradient } from "expo-linear-gradient";
import { Text, VStack, View } from "native-base";

export const EsqueciSenha = () => {
  return (
    <View flex={1} justifyContent={"center"}>
      <View flex={1} flexDirection={"column"}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#7345D6", "#DA4FE2"]}
          start={{ x: -0.2, y: 0.5 }}
          end={{ x: 1, y: -0.3 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <VStack space={"16px"} flex={1} padding={"35px"}>
          <Text>Esqueci a Senha</Text>
        </VStack>
      </View>
    </View>
  );
};
