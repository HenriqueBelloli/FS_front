import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemeColors } from '../../standards';

export default class TabButtonAdd extends React.Component {
  animation = new Animated.Value(0);
  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: true
    }).start();

    this.open = !this.open;
  };
 
  adicionarReceita = () =>{
    this.toggleMenu
    this.props.navigation.navigate('MovementAdd',{ tipo: '1' });
  }
  adicionarDespesa = () =>{
    this.toggleMenu
    this.props.navigation.navigate('MovementAdd',{ tipo: '2' });
  }
  render() {
    const incomeStyle = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,-70]
          })
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,-50]
          })
        }
      ],
    };
    
    const expenseStyle = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,-70]
          })
        },
        {
          translateX: this.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,50]
          })
        }
      ],
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.adicionarReceita}>
          <Animated.View style={[styles.button, styles.secondary, incomeStyle]}>
            <AntDesign name="arrowup" size={20} color={ThemeColors.verdeReceitas} />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.adicionarDespesa}>
          <Animated.View style={[styles.button, styles.secondary, expenseStyle]}>
            <AntDesign name="arrowdown" size={20} color={ThemeColors.vermelhoDespesas} />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name="plus" size={24} color="#FFF" />
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
    backgroundColor: ThemeColors.buttonPrimaryColor,
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#e4e3e3',
  },
});
