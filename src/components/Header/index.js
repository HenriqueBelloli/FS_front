import { React } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeColors } from '../../standards';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header({ name }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.buttonUser} activeOpacity={0.9}>
          <Feather name="user" size={20} color={ThemeColors.fonteSecundaria} />
        </TouchableOpacity>
        <Text style={styles.username}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.cardBackground,
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    fontSize: 12,
    marginLeft: 10,
    color: ThemeColors.fonteSecundaria,
    fontWeight: 'bold',
  },
  buttonUser: {
    width: 35,
    height: 35,
    borderColor:ThemeColors.fonteSecundaria,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
