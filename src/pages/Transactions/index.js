import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SwitchSelector from 'react-native-switch-selector';
import Movements from '../../components/Movements';
import ApiService from '../../services/apiService';
import { ThemeColors } from '../../standards';
import Select from '../../components/MonthYearPicker';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Transactions({ navigation }) {
  const route = useRoute();
  const paramTipo = route.params && route.params.tipo ? route.params.tipo : '1';
  const apiService = new ApiService();

  const [selectedOption, setSelectedOption] = useState(paramTipo === '1' ? 'receitas' : 'despesas');
  const [list, setList] = useState([]);

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [selectedYear, setSelectedYear] = useState(2023);

  const handleSelectChange = (value) => {
    setSelectedMonth(value);
  };

  const fetchData = useCallback(async () => {
    try {
      let firstDay = new Date(selectedYear, selectedMonth - 1, 1);
      let lastDay = new Date(selectedYear, selectedMonth, 0);
      firstDay.setDate(firstDay.getDate() + 1); // Tive que compensar a data pois Op.between estav reduzindo um dia sempre
      lastDay.setDate(lastDay.getDate() + 1);

      const response = await apiService.request('GET', 'movimentacoes/search', {
        usuarioId: 1,
        tipo: selectedOption === 'receitas' ? 1 : 2,
        periodo_inicial: firstDay.toISOString(), // Convertendo para string no formato ISO
        periodo_final: lastDay.toISOString(),
      });

      setList(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }, [selectedOption, selectedMonth]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedOption, selectedMonth]);

  const deletarMovimentacao = async (movementId) => {
    try {
      await apiService.request('DELETE', `movimentacoes?id=${movementId}`);

      fetchData();
    } catch (error) {
      Alert.alert('Erro ao excluir a movimentação:\n' + error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <SwitchSelector
          options={[
            { label: 'Receitas', value: 'receitas', activeColor: ThemeColors.verdeReceitas },
            { label: 'Despesas', value: 'despesas', activeColor: ThemeColors.vermelhoDespesas },
          ]}
          initial={0}
          onPress={(value) => setSelectedOption(value)}
          style={styles.switchSelector}
        />
        <Select options={months} selectedValue={selectedMonth} onSelect={handleSelectChange} />
      </View>

      <View style={styles.containerContent}>
        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => <Movements data={item} navigation={navigation} onDelete={deletarMovimentacao}/>}
        />
      </View>
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
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 30,
  },
});
