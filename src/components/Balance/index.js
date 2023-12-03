import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../../standards';
import ApiService from '../../services/apiService';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import pt from 'date-fns/locale/pt-BR'; // Importe o localizador para português do Brasil

export default function Balance() {
  const apiService = new ApiService();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let firstDay = startOfMonth(currentDate);
        let lastDay = endOfMonth(currentDate);
        firstDay.setDate(firstDay.getDate() + 1); // Tive que compensar a data pois Op.between estav reduzindo um dia sempre
        lastDay.setDate(lastDay.getDate() + 1);

        const response = await apiService.request('GET', 'usuarios/balance', {
          usuarioId: 1,
          periodo_inicial: firstDay.toISOString(),
          periodo_final: lastDay.toISOString(),
        });

        setSaldo(response.data.totalSaldo || 0);
        setReceitas(response.data.totalReceitas || 0);
        setDespesas(response.data.totalDespesas || 0);
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}> {format(currentDate, 'MMMM yyyy', { locale: pt })}</Text>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.itemLabel}>Saldo em contas</Text>
            <Text style={styles.balance}>R$ {saldo.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.containerBalanco}>
        <View style={styles.item}>
          <Ionicons name="ios-arrow-up-circle-sharp" size={50} color={ThemeColors.verdeReceitas} />
          <View style={styles.content}>
            <Text style={styles.itemLabel}>Receitas</Text>
            <Text style={styles.incomes}>R$ {receitas.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="ios-arrow-down-circle-sharp"
            size={50}
            color={ThemeColors.vermelhoDespesas}
          />
          <View style={styles.content}>
            <Text style={styles.itemLabel}> Despesas </Text>
            <Text style={styles.expences}>R$ {despesas.toFixed(2)}</Text>
          </View>
        </View>
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
