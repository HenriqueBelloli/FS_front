import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../../standards';

export default function TabButtonAdd({ size }) {
  return (
    <View style={styles.container}>
      <Entypo name="plus" size={size} color='white' />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ThemeColors.buttonPrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});