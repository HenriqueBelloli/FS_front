import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { ThemeColors } from '../../standards';
import ReceitasPieChart from '../../components/ReportIncomes';
import DespesasPieChart from '../../components/ReportExpenses';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Reports({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Gráficos</Text>
      </View>

      <View style={styles.containerContent}>
        <ReceitasPieChart navigation={navigation} />
        <DespesasPieChart navigation={navigation} />
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
});
