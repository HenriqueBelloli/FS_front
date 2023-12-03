import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemeColors } from '../../standards';

const Button = (props) => {
  const { primary, marginTop = 15 } = props;
  const backgroundColor = primary
  ? ThemeColors.buttonPrimaryColor
  : ThemeColors.buttonSecondaryColor;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor, marginTop}]} onPress={props.onPress}>
      <Text  style={styles.text}> {props.label} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%'
  },
  text:{
    color: ThemeColors.textColor,
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default Button;
