import { createContext, useContext, useEffect, useState } from "react";
import { IUsuario } from "../interface/IUsuario";
import { AxiosError } from "axios";
import { api } from "../utils/services/api";
import { Spinner, View, useToast } from "native-base";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
  signed: boolean;
  user: IUsuario | null;
  loginSubmit(email: string, senha: string): Promise<void>;
  deslogarSubmit(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUsuario | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      setIsLoading(true);
      const storagedUser = await AsyncStorage.getItem("@RNAuth:user");
      const storagedToken = await AsyncStorage.getItem("@RNAuth:token");

      api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
      setIsLoading(false);
    }

    loadStoragedData();
  }, []);

  async function loginSubmit(email: string, senha: string) {
    setIsLoading(true);
    await api
      .post("/auth/login", {
        email: email,
        password: senha,
      })
      .then(
        (response: { data: { access_token: string; usuario: IUsuario } }) => {
          setUser(response.data.usuario);

          AsyncStorage.setItem(
            "@RNAuth:user",
            JSON.stringify(response.data.usuario)
          );
          AsyncStorage.setItem("@RNAuth:token", response.data.access_token);

          api.defaults.headers[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
        }
      )
      .catch(
        (err: {
          response: {
            data: AxiosError<{
              statusCode: number;
              message: string;
            }>;
          };
        }) => {
          console.log(err.response.data.message);
          Toast.show({
            type: "error",
            text1: err.response.data.message,
            position: "top",
          });
        }
      );
    setIsLoading(false);
    return;
  }

  async function deslogarSubmit() {
    setUser(null);
    return;
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loginSubmit, deslogarSubmit }}
    >
      {isLoading ? (
        <View flex={1} justifyContent={"center"}>
          <Spinner size="lg" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
