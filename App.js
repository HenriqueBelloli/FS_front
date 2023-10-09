import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import merge from 'deepmerge';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Transactions from './src/pages/Transactions';
import Add from './src/pages/Add';
import Settings from './src/pages/Settings';
import { PreferencesContext } from './src/standards/PreferencesContext';

const Tab = createBottomTabNavigator();

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(true);
  let theme = !isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const preferences = React.useMemo(
    () => ({
      isThemeDark,
    }),
    [isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            initialRouteName="Login"
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
            <Tab.Screen name="Login" component={Login} options={{ headerShown: false, title: 'Login'}} />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, title: 'Principal'}} />
            <Tab.Screen name="Transactions" component={Transactions} options={{ headerShown: false, title: 'Transações' }} />
            <Tab.Screen name="Add" component={Add} options={{ headerShown: false, title: 'Adicionar' }} />
            <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, title: 'Definições' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
