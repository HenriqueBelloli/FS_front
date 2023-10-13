import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Add from '../pages/Add';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: [
          {
            height: 50,
          },
          null,
        ],
        tabBarLabelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, title: 'Principal' }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{ headerShown: false, title: 'Transações' }}
      />
      <Tab.Screen name="Add" component={Add} options={{ headerShown: false, title: 'Adicionar' }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, title: 'Definições' }}
      />
    </Tab.Navigator>
  );
}
