import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import Categories from '../../components/Categories';
import FloatingButton from '../../components/FloatingButton';
import SwitchSelector from 'react-native-switch-selector';
import ApiService from '../../services/apiService';
import { ThemeColors } from '../../standards';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const list = [
  {
    id: 1,
    tipo: 1,
    descricao: 'salário',
  },
  {
    id: 2,
    tipo: 1,
    descricao: 'salário',
  },
  {
    id: 3,
    tipo: 2,
    descricao: 'salário',
  },
];

export default function CategoryList({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('receitas');
  const [list, setList] = useState([]);
  const apiService = new ApiService(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.request('GET', 'categorias/usuarioCategorias', {
          usuarioId: 1,
          tipo: selectedOption === 'receitas' ? 1 : 2,
        });

        setList(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    fetchData();
  }, [selectedOption]);

  function adicionarCategoria() {
    navigation.navigate('CategoryAdd');
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}> Categorias</Text>
      </View>

      <View style={styles.containerContent}>
        <SwitchSelector
          options={[
            { label: 'Receitas', value: 'receitas', activeColor: ThemeColors.verdeReceitas },
            { label: 'Despesas', value: 'despesas', activeColor: ThemeColors.vermelhoDespesas },
          ]}
          initial={0}
          onPress={(value) => setSelectedOption(value)}
          style={styles.switchSelector}
        />

        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => <Categories data={item} />}
        />
      </View>
      <FloatingButton style={{ bottom: 70, right: 40 }} onPress={adicionarCategoria} />
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
