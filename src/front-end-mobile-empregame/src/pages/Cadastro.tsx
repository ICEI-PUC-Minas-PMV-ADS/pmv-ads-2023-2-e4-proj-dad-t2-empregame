import { LinearGradient } from "expo-linear-gradient";
import { Divider, Flex, Select, Text, VStack, View } from "native-base";
import { SelectPrimary } from "../components/select-primary";
import { useState } from "react";
import { api } from "../utils/services/api";
import { AxiosError } from "axios";
import { useAuth } from "../context/auth";
import Toast from "react-native-toast-message";
import { InputForm } from "../components/input-form";
import { InputPassword } from "../components/input-password";
import { numberToPhone } from "../utils/regex/numberToPhone";

export const Cadastro = () => {
  const { loginSubmit } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tipo, setTipo] = useState<"RECRUTADOR" | "CANDIDATO">("CANDIDATO");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [hardskill, setHardskill] = useState<string>("");
  const [listHardskill, setListHardskill] = useState<
    {
      id: number;
      nome: string;
      nivel_experiencia: number;
    }[]
  >([]);

  const [softskill, setSoftskill] = useState<string>("");
  const [listSoftskill, setListSoftskill] = useState<
    {
      id: number;
      nome: string;
      nivel_experiencia: number;
    }[]
  >([]);

  const adicionarHardskill = (hardskill: {
    id: number;
    nome: string;
    nivel_experiencia: number;
  }) => {
    setListHardskill((old) => [...old, hardskill]);
  };

  const adicionarSoftskill = (softskill: {
    id: number;
    nome: string;
    nivel_experiencia: number;
  }) => {
    setListSoftskill((old) => [...old, softskill]);
  };

  const cadastrar = async () => {
    setIsLoading(true);
    try {
      await api
        .post("/usuarios", {
          nome: nome,
          tipo: tipo,
          senha: senha,
          email: email,
          telefone: telefone,
          github: tipo === "CANDIDATO" ? github : "",
          portfolio: tipo === "CANDIDATO" ? portfolio : "",
        })
        .then((data: { data: { id: number } }) => {
          const idUsuario = data.data.id;
          if (tipo === "CANDIDATO") {
            listHardskill.map((hardskill) => {
              api
                .post("/hardskills", {
                  nome: hardskill.nome,
                })
                .then((data: { data: { id: number } }) => {
                  const idHardskill = data.data.id;
                  api.post("/usuarios/hardskills", {
                    nivel_experiencia: hardskill.nivel_experiencia,
                    id_usuario: idUsuario,
                    id_hardskill: idHardskill,
                  });
                });
            });
            listSoftskill.map((softskill) => {
              api
                .post("/softskills", {
                  nome: softskill.nome,
                })
                .then((data: { data: { id: number } }) => {
                  const idSoftskill = data.data.id;
                  api.post("/usuarios/softskills", {
                    nivel_experiencia: softskill.nivel_experiencia,
                    id_usuario: idUsuario,
                    id_softskill: idSoftskill,
                  });
                });
            });
          }
        })
        .catch((err) => {
          const error = err.response.data as AxiosError<{
            statusCode: number;
            message: string;
          }>;
          Toast.show({ text1: error.message, type: "error" });
        });

      await loginSubmit(email, senha).then(() => {
        Toast.show({
          text1: "Cadastro realizado com sucesso!",
          type: "success",
        });
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

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
        <Flex flex={2} padding={"35px"}>
          <Text
            fontSize={"48px"}
            fontWeight={"bold"}
            pb={"35px"}
            color={"white"}
          >
            Cadastro
          </Text>
          <VStack direction={"column"} space={"30px"}>
            <Text color={"white"} fontSize={"24px"} fontFamily={"Outfit-600"}>
              Primeiro precisamos saber quem você é?
            </Text>

            <SelectPrimary
              defaultValue="CANDIDATO"
              onValueChange={(e) => setTipo(e as "RECRUTADOR" | "CANDIDATO")}
            >
              <Select.Item label="Candidato" value="CANDIDATO" />
              <Select.Item label="Recrutador" value="RECRUTADOR" />
            </SelectPrimary>

            <Divider />

            <VStack space={"16px"}>
              <InputForm
                type="text"
                placeholder="Nome *"
                onChange={(e) => setNome(e)}
              />
              <InputForm
                keyboardType="email-address"
                type="text"
                placeholder="E-mail *"
                onChange={(e) => setEmail(e)}
              />
              <InputPassword
                placeholder="Senha *"
                onChange={(e) => setSenha(e)}
              />
              <InputForm
                keyboardType="phone-pad"
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(numberToPhone(e))}
              />
              {tipo === "CANDIDATO" && (
                <>
                  <InputForm
                    type="text"
                    placeholder="GitHub"
                    onChange={(e) => setGithub(e)}
                  />
                  <InputForm
                    type="text"
                    placeholder="Portfólio"
                    onChange={(e) => setPortfolio(e)}
                  />
                </>
              )}
            </VStack>
          </VStack>
        </Flex>
      </View>
    </View>
  );
};
