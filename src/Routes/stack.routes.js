import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import TabRoutes from './tab.routes';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: 'Login' }} />
      <Stack.Screen name="App" component={TabRoutes} options={{ headerShown: false, title: 'App' }} />
    </Stack.Navigator>
  );
}
