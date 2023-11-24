import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feed } from '../pages/Feed'
import { Chat } from '../pages/Chat'
import { Perfil } from '../pages/Perfil'

const AppStack = createNativeStackNavigator()
const AppRoutes = () => (
  <AppStack.Navigator initialRouteName="Perfil">
    <AppStack.Screen name="Feed" component={Feed} />
    <AppStack.Screen name="Chat" component={Chat} />
    <AppStack.Screen name="Perfil" component={Perfil} options={{headerShown:false}} />
  </AppStack.Navigator>
)

export default AppRoutes
