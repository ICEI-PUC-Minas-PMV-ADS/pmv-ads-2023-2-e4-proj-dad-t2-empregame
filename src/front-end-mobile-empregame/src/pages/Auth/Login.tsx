import { useState } from "react";
import { Button, Flex, Text, VStack, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { InputForm } from "../../components/input-form";
import { InputPassword } from "../../components/input-password";
import { ButtonPrimary } from "../../components/button-primary";
import { useAuth } from "../../context/auth";
import { LogoEmpregame } from "../../components/logo";

export const Login = ({ navigation }: any) => {
  const { loginSubmit } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  return (
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
      <Flex
        flex={4}
        padding={"35px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LogoEmpregame />
      </Flex>
      <VStack space={"16px"} flex={3} padding={"35px"}>
        <InputForm
          placeholder="E-mail"
          type="text"
          keyboardType="email-address"
          onChange={(e) => {
            setEmail(e);
          }}
        />
        <VStack>
          <InputPassword
            placeholder="Senha"
            onChange={(e) => {
              setSenha(e);
            }}
          />
          <Button
            variant={"link"}
            alignSelf={"flex-end"}
            onPress={() => {
              navigation.navigate("Esqueci a Senha");
            }}
          >
            <Text fontFamily={"Outfit-600"} fontSize={"14px"} color={"#DFC3FD"}>
              Esqueci a Senha
            </Text>
          </Button>
        </VStack>

        <ButtonPrimary
          buttonText="Acessar"
          onPress={() => loginSubmit(email, senha)}
        />
        <Button
          variant={"link"}
          onPress={() => {
            navigation.navigate("Cadastro");
          }}
        >
          <Text fontFamily={"Outfit-600"} fontSize={"18px"} color={"white"}>
            Cadastre-se agora
          </Text>
        </Button>
      </VStack>
    </View>
  );
};
