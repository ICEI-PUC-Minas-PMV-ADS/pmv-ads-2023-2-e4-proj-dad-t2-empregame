import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed } from "../pages/Feed";

const AppStack = createNativeStackNavigator();
const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Feed" component={Feed} />
  </AppStack.Navigator>
);

export default AppRoutes;
