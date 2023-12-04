import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ThemeColors } from '../../standards';
import ApiService from '../../services/apiService';
import { startOfMonth, endOfMonth } from 'date-fns';

export default function ReceitasPieChart({ navigation }) {
  const apiService = new ApiService();
  const [receitas, setReceitas] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const currentDate = new Date();
      let firstDay = startOfMonth(currentDate);
      let lastDay = endOfMonth(currentDate);
      firstDay.setDate(firstDay.getDate() + 1); // Tive que compensar a data pois Op.between estav reduzindo um dia sempre
      lastDay.setDate(lastDay.getDate() + 1);

      const response = await apiService.request('GET', 'movimentacoes/search', {
        usuarioId: global.usuarioId,
        tipo: 1,
        periodo_inicial: firstDay.toISOString(), // Convertendo para string no formato ISO
        periodo_final: lastDay.toISOString(),
      });
      setReceitas(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = receitas.map((item) => ({
    name: item.categoria.descricao,
    value: parseFloat(item.valor),
    color: ThemeColors.categorias[Math.floor(Math.random() * ThemeColors.categorias.length)],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}> Receitas por Categoria</Text>
      </View>
      <View style={styles.containerContent}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBalanco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingTop: 22,
  },
  containerContent: {
    backgroundColor: ThemeColors.fonteSecundaria,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 18,
    color: ThemeColors.fonte,
  },
  itemLabel: {
    fontSize: 14,
    color: ThemeColors.fonteSecundaria,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
});
