import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ApiService from '../../services/apiService';

const CategoryAdd = ({ navigation }) => {
  const [tipo, setTipo] = useState('2');
  const [descricao, setDescricao] = useState('');
  const apiService = new ApiService();

  async function categoriaCadastrar() {
    if (descricao === '') {
      alert('Informe a descrição');
      return;
    }

    const dados = {
      descricao: descricao,
      usuarioId: 1,
      tipo: parseInt(tipo, 10),
    };

    await apiService
      .request('POST', 'categorias', dados)
      .then(() => {
        alert('Categoria criada com sucesso!');
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
        return;
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cadastro de categorias</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.selectArea}>
          <Picker
            style={styles.select1}
            selectedValue={tipo}
            onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
            <Picker.Item label="Despesa" value="2" />
            <Picker.Item label="Receita" value="1" />
          </Picker>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="white"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={categoriaCadastrar}>
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
  select1: {
    height: 40,
    paddingHorizontal: 8,
    color: 'white',
  },
  selectArea: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
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

export default CategoryAdd;
