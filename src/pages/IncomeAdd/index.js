import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function IncomeAdd() {
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  const [campo3, setCampo3] = useState('');
  const [campo4, setCampo4] = useState('');
  const [campo5, setCampo5] = useState('');

  const handleSalvarPress = () => {
    // Faça algo com os valores dos campos quando o botão "Salvar" for pressionado
    console.log('Valores dos campos:', campo1, campo2, campo3, campo4, campo5);
  };

  const handleCancelarPress = () => {
    // Limpe os valores dos campos quando o botão "Cancelar" for pressionado
    setCampo1('');
    setCampo2('');
    setCampo3('');
    setCampo4('');
    setCampo5('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Receita</Text>

      {/* Primeiro Campo de Texto (ajustado) */}
      <View style={[styles.campoContainer, styles.primeiroCampo]}>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.inputMenor}
          placeholder="R$: 100,00"
          placeholderTextColor="gray"
          value={campo1}
          onChangeText={setCampo1}
        />
      </View>

      {/* Outros Campos de Texto */}
      {renderCampo('Data', campo2, setCampo2, 'DD/MM/YYYY')}
      {renderCampo('Descrição', campo3, setCampo3)}
      {renderCampo('Categoria', campo4, setCampo4)}
      {renderCampo('Conta', campo5, setCampo5)}

      {/* Botões */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, styles.botaoCancelar]} onPress={handleCancelarPress}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoSalvar]} onPress={handleSalvarPress}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const renderCampo = (label, value, onChangeText, placeholder) => (
  <View style={styles.campoContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder || `Digite a ${label.toLowerCase()}`}
      placeholderTextColor="gray"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F', // Cor de fundo escura
  },
  title: {
    fontSize: 30,
    color: 'green', // Cor do texto branca
    marginBottom: 20,
  },
  campoContainer: {
    marginBottom: 15,
  },
  primeiroCampo: {
    marginTop: -10,
  },
  label: {
    color: 'white', // Cor do texto do label
  },
  input: {
    height: 45,
    width: 320,
    borderRadius: 10,
    borderColor: 'white', // Cor da borda
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    color: 'white', // Cor do texto do input
  },
  inputMenor: {
    height: 60,
    width: 150,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    fontSize: 20,
    color: 'white',
  },
  botoesContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  botao: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#3580FF2E', // Cor de fundo do botão "Cancelar"
  },
  botaoSalvar: {
    backgroundColor: '#3580FF', // Cor de fundo do botão "Salvar"
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
  },
});
