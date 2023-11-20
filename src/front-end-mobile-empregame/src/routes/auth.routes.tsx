import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";
import { EsqueciSenha } from "../pages/EsqueciSenha";

const AuthStack = createNativeStackNavigator();
const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Cadastro"
      component={Cadastro}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Esqueci a Senha"
      component={EsqueciSenha}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
