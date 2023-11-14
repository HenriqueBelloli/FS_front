import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import TabRoutes from './tab.routes';
import Cadastro from '../pages/Cadastro';
import AddIncome from '../pages/AddIncome';
import AddExpense from '../pages/AddExpense';
import AccountList from '../pages/AccountList';
import AccountAdd from '../pages/AccountAdd';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />

      <Stack.Screen name="AddIncome" component={AddIncome} options={{ headerShown: false }} />
      <Stack.Screen name="AddExpense" component={AddExpense} options={{ headerShown: false }} />

      <Stack.Screen name="AccountList" component={AccountList} options={{ headerShown: false }} />
      <Stack.Screen name="AccountAdd" component={AccountAdd} options={{ headerShown: false }} />

      <Stack.Screen name="App" component={TabRoutes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
