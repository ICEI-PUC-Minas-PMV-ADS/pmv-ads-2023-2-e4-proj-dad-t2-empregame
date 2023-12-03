import { AxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Button, Flex, HStack, Text, VStack, View } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../../utils/services/api";
import Toast from "react-native-toast-message";
import { InputForm } from "../../components/input-form";
import { ButtonPrimary } from "../../components/button-primary";
import { InputPassword } from "../../components/input-password";
import { IconVoltar } from "../../components/icons";
import { isEmail } from "../../utils/validator/isEmail";

export const EsqueciSenha = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [email, setEmail] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const submitResetSenha = async () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (step === 1 && !email)
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail",
      });

    if (step === 1 && !isEmail(email))
      erros.push({
        field: "email",
        message: "Preencha o campo E-mail corretamente",
      });

    if (step === 2 && !codigo)
      erros.push({
        field: "codigo",
        message: "Preencha o campo Código",
      });

    if (step === 2 && !senha)
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

    setIsLoading(true);
    await api
      .post("/auth/redefinir-senha", {
        email: email,
        codigo: codigo ? codigo : "",
        senha: senha ? senha : "",
      })
      .then(() => {
        if (!codigo && !senha) {
          Toast.show({
            text1: "Email enviado",
            type: "success",
          });
          setStep(2);
        } else {
          Toast.show({
            text1: "Senha atualizada com sucesso!",
            type: "success",
          });
          navigation.goBack();
        }
      })
      .catch((err) => {
        const error = err.response.data as AxiosError<{
          statusCode: number;
          message: string;
        }>;
        Toast.show({ text1: error.message, type: "error" });
      });
    setIsLoading(false);
  };

  const reenviarResetSenha = async () => {
    await api
      .post("/auth/redefinir-senha", {
        email: email,
      })
      .then(() => {
        Toast.show({
          text1: "Email enviado",
          type: "success",
        });
      })
      .catch((err) => {
        const error = err.response.data as AxiosError<{
          statusCode: number;
          message: string;
        }>;
        Toast.show({ text1: error.message, type: "error" });
      });
  };

  useEffect(() => {
    setErrors([]);
  }, [senha, email, codigo]);

  return (
    <View flex={1}>
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
      <Flex padding={"35px"} flex={2}>
        <Button
          marginY={"20px"}
          alignSelf={"flex-start"}
          bg={"none"}
          rounded={"full"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <HStack space={"10px"} alignItems={"center"}>
            <IconVoltar />
            <Text fontFamily={"Outfit-500"} color={"white"}>
              Voltar
            </Text>
          </HStack>
        </Button>
      </Flex>

      <Flex padding={"35px"} flex={5}>
        <Text
          fontFamily={"Outfit-600"}
          fontSize={"36px"}
          fontWeight={"bold"}
          pb={"35px"}
          color={"white"}
        >
          Esqueci a Senha
        </Text>
        <VStack space={"20px"}>
          {step === 1 && (
            <Box>
              <Text
                fontFamily={"Outfit-600"}
                fontWeight={"semibold"}
                color={"white"}
                paddingBottom={"20px"}
              >
                Informe o e-mail de sua conta
              </Text>
              <InputForm
                type="text"
                keyboardType="email-address"
                placeholder="E-mail"
                onChange={(e) => setEmail(e)}
                messageError={errors.find((e) => e.field === "email")?.message}
              />
            </Box>
          )}
          {step === 2 && (
            <VStack space={"20px"}>
              <Text
                fontFamily={"Outfit-600"}
                fontWeight={"semibold"}
                color={"white"}
              >
                Informe o código que recebeu no e-mail e a nova senha
              </Text>
              <HStack alignItems={"center"}>
                <Text
                  fontFamily={"Outfit-600"}
                  fontWeight={"semibold"}
                  color={"white"}
                >
                  Não chegou?
                </Text>
                <Button bg={"none"} onPress={() => reenviarResetSenha()}>
                  <Text fontFamily={"Outfit-600"} color={"white"}>
                    Reenviar código
                  </Text>
                </Button>
              </HStack>

              <InputForm
                type="text"
                keyboardType="number-pad"
                placeholder="Código"
                onChange={(e) => setCodigo(e)}
                messageError={errors.find((e) => e.field === "codigo")?.message}
              />
              <InputPassword
                placeholder="Nova senha"
                onChange={(e) => setSenha(e)}
                messageError={errors.find((e) => e.field === "senha")?.message}
              />
            </VStack>
          )}
          <Box textAlign={"center"}>
            <ButtonPrimary
              onPress={() => submitResetSenha()}
              buttonText="Enviar"
              isLoading={isLoading}
              loadingText="Enviando"
            />
          </Box>
        </VStack>
      </Flex>
    </View>
  );
};
