import React, { createRef, useState, useEffect } from 'react';
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.cardBackground,
    flex: 1,
    justifyContent: 'center',
  },
});

export default Login;
