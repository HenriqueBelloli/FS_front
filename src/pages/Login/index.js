import React, { createRef, useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/Input';

const Login = () => {
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
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
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
      <TouchableOpacity onPress={logar}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
