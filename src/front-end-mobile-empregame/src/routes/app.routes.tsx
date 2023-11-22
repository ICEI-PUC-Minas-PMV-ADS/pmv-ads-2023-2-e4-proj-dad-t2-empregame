import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feed } from '../pages/Feed'
import { Chat } from '../pages/Chat'

const AppStack = createNativeStackNavigator()
const AppRoutes = () => (
  <AppStack.Navigator initialRouteName="Feed">
    <AppStack.Screen name="Feed" component={Feed} />
    <AppStack.Screen name="Chat" component={Chat} />
  </AppStack.Navigator>
)

export default AppRoutes
