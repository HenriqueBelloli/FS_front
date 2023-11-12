import React, { createRef, useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ThemeColors } from '../../standards';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const emailInput = createRef();
  const passInput = createRef();

  useEffect(() => emailInput.current.resetError, [email]);
  useEffect(() => passInput.current.resetError, [pass]);

  function logar() {
    if (email === '') {
      alert('e-mail inválido');
      emailInput.current.focusOnError();
      return;
    }
    if (pass === '') {
      alert('Senha inválida');
      passInput.current.focusOnError();
      return;
    }
    navigation.navigate('App');
  }
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.container}>
        <Input
          ref={emailInput}
          value={email}
          onChangeText={setEmail}
          iconName={'person'}
          placeholder="e-mail"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <Input
          ref={passInput}
          value={pass}
          onChangeText={setPass}
          iconName={'lock-closed'}
          placeholder="senha"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          secureTextEntry
        />
        <Button label="Entrar" onPress={logar} />

        <TouchableOpacity style={styles.register}>
          <Text style={styles.registerText}>Ainda não possui conta?</Text>
          <Text style={styles.registerTextHighlight}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: ThemeColors.cardBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '95%',
    paddingBottom: 50,
  },
  register: {
    marginTop: 30,
    flexDirection: 'row',
  },
  registerText: {
    color: ThemeColors.textColor,
    paddingRight: 5,
  },
  registerTextHighlight:{
    color: ThemeColors.buttonPrimaryColor,
  }
});

export default Login;
