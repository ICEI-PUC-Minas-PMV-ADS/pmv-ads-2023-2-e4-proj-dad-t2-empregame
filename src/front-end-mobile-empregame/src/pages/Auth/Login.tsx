import { useEffect, useState } from "react";
import { Button, Flex, Text, VStack, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { InputForm } from "../../components/input-form";
import { InputPassword } from "../../components/input-password";
import { ButtonPrimary } from "../../components/button-primary";
import { useAuth } from "../../context/auth";
import { LogoEmpregame } from "../../components/logo";
import Toast from "react-native-toast-message";
import { isEmail } from "../../utils/validator/isEmail";

export const Login = ({ navigation }: any) => {
  const { loginSubmit } = useAuth();

  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const pressLogin = () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (!email)
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail",
      });

    if (!isEmail(email))
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail corretamente",
      });

    if (!senha)
      erros.push({
        field: "senha",
        message: "Preencha o campo Senha",
      });

    if (erros.length > 0) {
      Toast.show({
        text1: "Campos incompletos/incorretos",
        type: "error",
      });
      return setErrors(erros);
    }

    loginSubmit(email, senha);
  };

  useEffect(() => {
    setErrors([]);
  }, [senha, email]);

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
        flex={3}
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
          messageError={errors.find((e) => e.field === "email")?.message}
        />
        <VStack>
          <InputPassword
            placeholder="Senha"
            onChange={(e) => {
              setSenha(e);
            }}
            messageError={errors.find((e) => e.field === "senha")?.message}
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

        <ButtonPrimary buttonText="Acessar" onPress={() => pressLogin()} />
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
