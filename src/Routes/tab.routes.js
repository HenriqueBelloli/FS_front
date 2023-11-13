import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../standards';
import TabButtonAdd from '../components/TabButtonAdd';

import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Add from '../pages/Add';
import News from '../pages/News';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarStyle: [
          {
            height: 60,
            backgroundColor: ThemeColors.screenBackground,
            borderTopColor: 'transparent',
            paddingBottom: 5,
            paddingTop: 5,
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
        options={{
          headerShown: false,
          title: 'Principal',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerShown: false,
          title: 'Transações',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-list' : 'ios-list-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ size }) => <TabButtonAdd size={size} />,
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          title: 'Noticias',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'ios-newspaper' : 'ios-newspaper-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          title: 'Definições',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'ios-settings' : 'ios-settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}