import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../../standards';

export default function Balance({ saldo, gastos }) {
  return (
    <View style={styles.container}>

      <View style={styles.containerHeader}>
        <Text style={styles.title}> Setembro 2023</Text>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.itemLabel}>Saldo em contas</Text>
            <Text style={styles.balance}>R$ {saldo}</Text>
          </View>
        </View>

      </View>

      <View style={styles.containerBalanco}>

        <View style={styles.item}>
          <Ionicons name="ios-arrow-up-circle-sharp" size={50} color={ThemeColors.verdeReceitas} />
          <View style={styles.content}>
            <Text style={styles.itemLabel}>Receitas</Text>
            <Text style={styles.incomes}>R$ {saldo}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons name="ios-arrow-down-circle-sharp" size={50} color={ThemeColors.vermelhoDespesas} />
          <View style={styles.content}>
            <Text style={styles.itemLabel}> Despesas </Text>
            <Text style={styles.expences}>R$ {gastos}</Text>
          </View>
        </View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.fundoContainer,
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
    paddingBottom:10,
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
