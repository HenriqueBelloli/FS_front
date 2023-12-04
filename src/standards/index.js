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
  categorias :[
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#8BC34A',
    '#CDDC39',
    '#FFE082',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#455A64',
  ]
};

module.exports = { ThemeColors };
