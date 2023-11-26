import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed } from "../pages/App/Feed/Feed";
import { Chat } from "../pages/App/Feed/Chat";
import { Perfil } from "../pages/App/Perfil/Perfil";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogoEmpregameMenor } from "../components/logo";
import {
  IconCandidatos,
  IconVagas,
  IconVagasInteressei,
} from "../components/icons";
import { VagasInteressei } from "../pages/App/Feed/VagasInteressei";
import { MenuHeader } from "../components/menu-header";
import { useAuth } from "../context/auth";
import { MinhasVagas } from "../pages/App/Feed/MinhasVagas/MinhasVagas";
import { BuscarCandidatos } from "../pages/App/Feed/BuscarCandidatos";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="TabNavegation"
        options={{
          title: "",
          headerShown: false,
        }}
        component={TabNavegation}
      />
      <AppStack.Screen
        name="Chat"
        options={{
          headerStyle: {
            backgroundColor: "#6D3BBF",
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontFamily: "Outfit-600",
            fontSize: 16,
          },
          headerTintColor: "#FFFFFF",
          headerTitleAlign: "center",
        }}
        component={Chat}
      />
      <AppStack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
        initialParams={{ idusuario: user?.id }}
      />
    </AppStack.Navigator>
  );
};

export default AppRoutes;

function TabNavegation({ navigation }: any) {
  const { user } = useAuth();
  const { deslogarSubmit } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6D3BBF",
        tabBarInactiveTintColor: "#9E9E9E",
        headerTitleAlign: "left",
        tabBarStyle: {
          paddingBottom: 18,
          paddingTop: 18,
          paddingHorizontal: 40,
          height: 82,
          shadowColor: "#999999",
          borderTopColor: "transparent",
          position: "absolute",
          borderRadius: 120,
          margin: 15,
          elevation: 5,
        },
        headerStyle: {
          backgroundColor: "#6D3BBF",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
        headerTitleStyle: {
          color: "#FFFFFF",
          fontFamily: "Outfit-600",
          fontSize: 18,
          textAlignVertical: "center",
        },
        tabBarLabelStyle: {
          fontFamily: "Outfit-600",
          fontSize: 12,
        },
        headerLeft: () => {
          return (
            <LogoEmpregameMenor
              style={{ paddingBottom: 40, paddingRight: 30 }}
            />
          );
        },
        headerRight: () => (
          <MenuHeader
            onPressPerfil={() =>
              navigation.navigate("Perfil", { idusuario: user?.id })
            }
            onPressDeslogar={() => deslogarSubmit()}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 22,
          paddingTop: 10,
        },
        headerBackgroundContainerStyle: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => <IconVagas color={color} />,
        }}
      />
      {user?.tipo === "CANDIDATO" && (
        <Tab.Screen
          name="Interessei"
          component={VagasInteressei}
          options={{
            tabBarIcon: ({ color }) => <IconVagasInteressei color={color} />,
          }}
        />
      )}

      {user?.tipo === "RECRUTADOR" && (
        <>
          <Tab.Screen
            name="Minhas Vagas"
            component={MinhasVagas}
            options={{
              tabBarIcon: ({ color }) => <IconVagasInteressei color={color} />,
            }}
          />
          <Tab.Screen
            name="Candidatos"
            component={BuscarCandidatos}
            options={{
              tabBarIcon: ({ color }) => <IconCandidatos color={color} />,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
