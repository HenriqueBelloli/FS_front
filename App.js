import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeColors } from './src/standards';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';

export default function App() {
  const scheme = useColorScheme();

  return (
    <PaperProvider theme={scheme === 'dark' ? ThemeColors.DarkTheme : ThemeColors.DefaultTheme}>
      <Routes />
    </PaperProvider>
  );
}
