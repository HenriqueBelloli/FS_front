import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../../standards';

export default class TabButtonSettings extends React.Component {
  animation = new Animated.Value(0);
  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    this.open = !this.open;
  };

  abrirTela = () => {
    this.props.navigation.navigate('Add');
  };

  render() {
    const incomeStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        }
      ],
    };

    const expenseStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -150],
          }),
        }
      ],
    };

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.abrirTela}>
          <Animated.View style={[styles.button, styles.secondary, incomeStyle]}>
            <AntDesign name="arrowup" size={20} color={ThemeColors.verdeReceitas} />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.abrirTela}>
          <Animated.View style={[styles.button, styles.secondary, expenseStyle]}>
            <AntDesign name="arrowdown" size={20} color={ThemeColors.vermelhoDespesas} />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.menu]}>
            <Ionicons
              name={this.props.focused ? 'ios-settings' : 'ios-settings-outline'}
              size={24}
              color={this.props.color}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
   // backgroundColor: ThemeColors.buttonPrimaryColor,
    position: 'absolute',
    width: 60,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: ThemeColors.cardBackground,
  },
});
