import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AccountAdd = ({ navigation }) => {
  const [bankName, setBankName] = useState('');
  const [balance, setBalance] = useState('');

  const handleAddAccount = () => {
    console.log('Banco:', bankName);
    console.log('Saldo:', balance);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cadastro de contas</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome do Banco</Text>
        <TextInput
          style={styles.input}
          placeholder="Exemplo: Banco do Brasil"
          placeholderTextColor="white"
          value={bankName}
          onChangeText={(text) => setBankName(text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Saldo</Text>
        <TextInput
          style={styles.input}
          placeholder="Exemplo: R$ 2000"
          placeholderTextColor="white"
          value={balance}
          onChangeText={(text) => setBalance(text)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
        <Text style={styles.addButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1F1F1F',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: 'white',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: 'white',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountAdd;
