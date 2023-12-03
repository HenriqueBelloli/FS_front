import { createStackNavigator } from '@react-navigation/stack';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import MovementAdd from '../pages/MovementAdd';
import AccountList from '../pages/AccountList';
import AccountAdd from '../pages/AccountAdd';
import CategoryList from '../pages/CategoryList';
import CategoryAdd from '../pages/CategoryAdd';
import TabRoutes from './tab.routes';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={UserLogin} options={{ headerShown: false }} />
      <Stack.Screen name="UserRegister" component={UserRegister} options={{ headerShown: false }} />

      <Stack.Screen name="MovementAdd" component={MovementAdd} options={{ headerShown: false }} />

      <Stack.Screen name="AccountList" component={AccountList} options={{ headerShown: false }} />
      <Stack.Screen name="AccountAdd" component={AccountAdd} options={{ headerShown: false }} />

      <Stack.Screen name="CategoryList" component={CategoryList} options={{ headerShown: false }} />
      <Stack.Screen name="CategoryAdd" component={CategoryAdd} options={{ headerShown: false }} />

      <Stack.Screen name="AppMain" component={TabRoutes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
