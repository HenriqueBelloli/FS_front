import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ApiService from '../../services/apiService';
import { ThemeColors } from '../../standards';
import Button from '../../components/Button';
import { Icon } from 'react-native-elements';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const AccountAdd = ({ navigation }) => {
  const route = useRoute();
  const editData = route.params?.editData || null;

  const [descricao, setDescricao] = useState(editData?.descricao || '');
  const [saldo, setSaldo] = useState(editData?.saldo.toString() || '');
  const apiService = new ApiService();

  async function contaCadastrar() {
    try {
      if (descricao === '') {
        Alert.alert('Informe a descrição');
        return;
      }

      const saldoFloat = parseFloat(saldo);

      if (isNaN(saldoFloat)) {
        Alert.alert('O saldo deve ser um valor numérico');
        return;
      }

      const dados = {
        descricao: descricao,
      };

      //Dados que são enviados apenas durante o cadastro
      if (!editData) {
        (dados.usuarioId = 1), (dados.saldo = saldoFloat);
      }

      await apiService.request(
        editData ? 'PUT' : 'POST',
        `contas${editData ? `?id=${editData.id}` : ''}`,
        dados
      );

      Alert.alert(
        editData ? 'Conta alterada com sucesso!' : 'Conta criada com sucesso!',
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
      Alert.alert('Erro ao gravar conta.\n' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.headerText}>{editData ? 'Editar Conta' : 'Cadastro de Contas'}</Text>
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
              name="dollar"
              type="font-awesome"
              color={ThemeColors.fonteSecundaria}
              style={styles.icon}
              size={25}
            />

            <TextInput
              style={styles.input}
              placeholder="Saldo atual"
              placeholderTextColor={ThemeColors.icone}
              value={saldo}
              onChangeText={(text) => setSaldo(text)}
              keyboardType="numeric"
            />
          </View>
        )}

        <Button
          label={editData ? 'Salvar' : 'Cadastrar'}
          onPress={contaCadastrar}
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

export default AccountAdd;
