import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../../standards';
import ApiService from '../../services/apiService';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import pt from 'date-fns/locale/pt-BR'; // Importe o localizador para português do Brasil

export default function Balance({ navigation }) {
  const apiService = new ApiService();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      let firstDay = startOfMonth(currentDate);
      let lastDay = endOfMonth(currentDate);
      firstDay.setDate(firstDay.getDate() + 1); // Tive que compensar a data pois Op.between estav reduzindo um dia sempre
      lastDay.setDate(lastDay.getDate() + 1);

      const response = await apiService.request('GET', 'usuarios/balance', {
        usuarioId: global.usuarioId,
        periodo_inicial: firstDay.toISOString(),
        periodo_final: lastDay.toISOString(),
      });

      setSaldo(response.data.totalSaldo || 0);
      setReceitas(response.data.totalReceitas || 0);
      setDespesas(response.data.totalDespesas || 0);
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

  function listarReceitas() {
    navigation.navigate('Transactions',{ tipo: '1' })
  }

  function listarDespesas() {
    navigation.navigate('Transactions',{ tipo: '2' })
  }
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}> {format(currentDate, 'MMMM yyyy', { locale: pt })}</Text>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.itemLabel}>Saldo em contas</Text>
            <Text style={styles.balance}>
              {Number(saldo).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.containerBalanco}>
        <TouchableOpacity style={styles.item} onPress={listarReceitas}>
          <Ionicons name="ios-arrow-up-circle-sharp" size={50} color={ThemeColors.verdeReceitas} />
          <View style={styles.content}>
            <Text style={styles.itemLabel}>Receitas</Text>
            <Text style={styles.incomes}>
              {Number(receitas).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={listarDespesas}>
          <Ionicons
            name="ios-arrow-down-circle-sharp"
            size={50}
            color={ThemeColors.vermelhoDespesas}
          />
          <View style={styles.content}>
            <Text style={styles.itemLabel}> Despesas </Text>
            <Text style={styles.expences}>
              {Number(despesas).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.cardBackground,
    paddingStart: 18,
    paddingEnd: 18,
    borderRadius: 4,
    paddingBottom: 22,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  containerHeader: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  containerBalanco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: 18,
    paddingEnd: 18,
    borderRadius: 4,
    paddingTop: 22,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
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
  item: {
    flexDirection: 'row',
  },
  content: {
    alignItems: 'center',
    marginLeft: 5,
  },
  balance: {
    fontSize: 30,
    color: ThemeColors.fonte,
  },
  incomes: {
    fontSize: 20,
    color: ThemeColors.verdeReceitas,
  },
  expences: {
    fontSize: 20,
    color: ThemeColors.vermelhoDespesas,
  },
});
