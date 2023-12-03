import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const ThemeColors = {
  DarkTheme: CombinedDarkTheme,
  DefaultTheme: CombinedDefaultTheme,
  screenBackground: CombinedDarkTheme.colors.background,
  cardBackground: CombinedDarkTheme.colors.border,
  buttonPrimaryColor: CombinedDarkTheme.colors.primary,
  buttonSecondaryColor: '#8e8e91',
  textColor: CombinedDarkTheme.colors.text,

  verdeReceitas: '#01C853',
  vermelhoDespesas: '#DE4848',
  fonte: '#DADADA',
  fonteSecundaria: '#AFAFB7',
  vermelhoErro: '#f80707',
  borda: '#E4E7EB',
  icone: '#7B8794',
};

module.exports = { ThemeColors };
