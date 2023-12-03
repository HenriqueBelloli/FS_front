import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ApiService from '../../services/apiService';
import Button from '../../components/Button';
import { Icon } from 'react-native-elements';
import { ThemeColors } from '../../standards';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const CategoryAdd = ({ navigation }) => {
  const apiService = new ApiService();
  const route = useRoute();
  const editData = route.params?.editData || null;
  const paramTipo = route.params.tipo || {};

  const [tipo, setTipo] = useState(paramTipo === 'receitas' ? '1' : '2');
  const [descricao, setDescricao] = useState(editData?.descricao || '');
  
  async function categoriaCadastrar() {
    try {
      if (descricao === '') {
        Alert.alert('Informe a descrição');
        return;
      }

      const dados = {
        descricao: descricao,
      };

      //Dados que são enviados apenas durante o cadastro
      if (!editData) {
        (dados.usuarioId = 1), (dados.tipo = parseInt(tipo, 10));
      }

      await apiService.request(
        editData ? 'PUT' : 'POST',
        `categorias${editData ? `?id=${editData.id}` : ''}`,
        dados
      );

      Alert.alert(
        editData ? 'Categoria alterada com sucesso!' : 'Categoria criada com sucesso!',
        '',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Erro ao gravar categoria.\n' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.headerText}>
          {editData ? 'Editar categoria' : 'Cadastro de categorias'}
        </Text>
      </View>

      <View style={styles.containerContent}>
        <View style={styles.containerInput}>
          <Icon
            name="create-outline"
            type="ionicon"
            color={ThemeColors.fonteSecundaria}
            style={styles.icon}
            size={25}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor={ThemeColors.icone}
            value={descricao}
            onChangeText={(text) => setDescricao(text)}
          />
        </View>
        {!editData && (
          <View style={styles.containerInput}>
            <Icon
              name="bookmark-outline"
              type="ionicon"
              color={ThemeColors.fonteSecundaria}
              style={styles.icon}
              size={25}
            />
            <Picker
              style={styles.input}
              selectedValue={tipo}
              onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
              <Picker.Item label="Despesa" value="2" />
              <Picker.Item label="Receita" value="1" />
            </Picker>
          </View>
        )}

        <Button
          label={editData ? 'Salvar' : 'Cadastrar'}
          onPress={categoriaCadastrar}
          primary
          marginTop={70}
        />
        <Button label="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.screenBackground,
  },
  containerHeader: {
    marginTop: statusBarHeight,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
    flex: 1,
    backgroundColor: ThemeColors.cardBackground,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  containerInput: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borda,
    marginStart: 14,
    marginEnd: 14,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: ThemeColors.textColor,
  },
  input: {
    height: 50,
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
    color: ThemeColors.textColor,
  },
  icon: {
    marginRight: 10,
    top: 10,
  },
});

export default CategoryAdd;
