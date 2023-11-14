import React, { createRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ThemeColors } from '../../standards';

const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const nameInput = createRef();
  const emailInput = createRef();
  const passInput = createRef();
  const confirmPassInput = createRef();

  useEffect(() => nameInput.current.resetError, [name]);
  useEffect(() => emailInput.current.resetError, [email]);
  useEffect(() => passInput.current.resetError, [pass]);
  useEffect(() => confirmPassInput.current.resetError, [confirmPass]);

  function cadastrar() {
    if (name == '') {
      alert('Nome inválido');
      nameInput.current.focusOnError();
      return;
    }

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
    if (confirmPass === '') {
      alert('Confirme a senha');
      confirmPassInput.current.focusOnError();
      return;
    }
    if (pass !== confirmPass) {
      alert('Senhas informadas não conferem');
      confirmPassInput.current.focusOnError();
      return;
    }
    navigation.navigate('App');
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subTitle}>Cadastre-se utilizando seu e-mail e senha.</Text>
      </View>
      <View style={styles.container}>
        <Input
          ref={nameInput}
          value={name}
          onChangeText={setName}
          iconName={'person'}
          placeholder="nome"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
        />

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
        <Input
          ref={confirmPassInput}
          value={confirmPass}
          onChangeText={setConfirmPass}
          iconName={'lock-closed'}
          placeholder="confirme a senha"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          secureTextEntry
        />
        <Button label="Cadastrar" onPress={cadastrar} />
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
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    width: '95%',
    paddingBottom: 50,
  },
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 30,
    color: ThemeColors.textColor,
  },
  subTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: ThemeColors.textColor,
  },
  container: {
    flex: 3,
    alignItems: 'center',
    width: '95%',
    paddingBottom: 50,
  },
});

export default Login;
