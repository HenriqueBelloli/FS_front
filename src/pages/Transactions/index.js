import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import Movements from '../../components/Movements';
import { ThemeColors } from '../../standards';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const list = [
  {
    id: 1,
    label: 'Boleto conta luz',
    value: '300,90',
    date: '17/09/2023',
    type: 0,
    category: 'Moradia',
    account: 'Conta Corrente'
  },
  {
    id: 2,
    label: 'Mesada',
    value: '500,00',
    date: '15/09/2023',
    type: 1,
    category: 'Salário',
    account: 'Conta Corrente'
  },
  {
    id: 3,
    label: 'Pastel',
    value: '10,00',
    date: '20/09/2023',
    type: 0,
    category: 'Alimentação',
    account: 'Carteira'
  },
];

export default function Transactions() {
  return (
    <View  style={styles.container}>

      <View style={styles.containerHeader}>
        <Text style={styles.title}> Setembro 2023</Text>
      </View>

      <View style={styles.containerContent}>
        <Text style={styles.title}> Transações</Text>

        <FlatList style={styles.list} data={list} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={true} renderItem={({ item }) => <Movements data={item} />} />
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
    alignItems: 'center'
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
});
