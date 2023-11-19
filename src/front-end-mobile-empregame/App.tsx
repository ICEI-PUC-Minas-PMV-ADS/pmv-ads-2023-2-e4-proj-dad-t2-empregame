import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { useFonts } from "expo-font";
import Routes from "./src/routes";
import { AuthProvider } from "./src/context/auth";
import Toast from "react-native-toast-message";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Outfit-100": require("./assets/fonts/Outfit-Thin.ttf"),
    "Outfit-200": require("./assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-300": require("./assets/fonts/Outfit-Light.ttf"),
    "Outfit-400": require("./assets/fonts/Outfit-Regular.ttf"),
    "Outfit-500": require("./assets/fonts/Outfit-Medium.ttf"),
    "Outfit-600": require("./assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-700": require("./assets/fonts/Outfit-Bold.ttf"),
    "Outfit-800": require("./assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-900": require("./assets/fonts/Outfit-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NativeBaseProvider>
      <Toast />
    </NavigationContainer>
  );
}
