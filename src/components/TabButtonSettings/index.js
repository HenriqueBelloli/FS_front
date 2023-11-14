import React from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback, Text } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
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

  acessarCategorias = () =>{
    this.toggleMenu
    this.props.navigation.navigate('AccountAdd');
  }
  acessarContas = () =>{
    this.toggleMenu
    this.props.navigation.navigate('AccountList');
  }

  render() {
    const contaStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -50],
          }),
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,-15]
          })
        }
      ],
    };

    const categoriaStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -100],
          }),
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,-15]
          })
        }
      ],
    };

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.acessarContas}>
          <Animated.View style={[styles.button, styles.secondary, contaStyle]}>
            <Text style={styles.buttonText}>Contas</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.acessarCategorias}>
          <Animated.View style={[styles.button, styles.secondary, categoriaStyle]}>
            <Text style={styles.buttonText}>Categorias</Text>
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
    width: 100, 
    height: 38, 
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.cardBackground,
  },
  buttonText: {
    color: 'white',
  },
  menu: {
    position: 'absolute',
    width: 60,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: ThemeColors.cardBackground,
  },
});
