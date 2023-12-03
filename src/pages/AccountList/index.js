import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Alert } from 'react-native';
import Account from '../../components/Account';
import FloatingButton from '../../components/FloatingButton';
import ApiService from '../../services/apiService';
import { ThemeColors } from '../../standards';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function AccountList({ navigation }) {
  const [list, setList] = useState([]);
  const apiService = new ApiService();

  const fetchData = useCallback(async () => {
    try {
      const response = await apiService.request('GET', 'contas/usuarioContas', {
        usuarioId: 1,
      });

      setList(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }, [apiService]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  const deletarConta = async (accountId) => {
    try {
      await apiService.request('DELETE', `contas?id=${accountId}`);

      fetchData();
    } catch (error) {
      Alert.alert('Erro ao excluir conta:\n' + error.message);
    }
  };

  function adicionarConta() {
    navigation.navigate('AccountAdd');
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Contas</Text>
      </View>

      <View style={styles.containerContent}>
        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => <Account data={item} navigation={navigation} onDelete={deletarConta} />}
        />
      </View>
      <FloatingButton style={{ bottom: 70, right: 40 }} onPress={adicionarConta} />
    </View>
  );
}

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 18,
    color: ThemeColors.fonte,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  switchSelector: {
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 30,
  },
});
