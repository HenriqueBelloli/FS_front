import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';

const list = [
  {
    id: 1,
    label: 'Boleto conta luz',
    value: '300,90',
    date: '17/09/2023',
    type: 0
  },
  {
    id: 2,
    label: 'Mesada',
    value: '500,00',
    date: '15/09/2023',
    type: 1
  },
  {
    id: 3,
    label: 'Pastel',
    value: '10,00',
    date: '20/09/2023',
    type: 0
  }
]

export default function Home() {
  return (
    <View style={styles.container}>
      <Header name="User" />
      <Balance saldo="1.000" gastos = "800.00"/>

      <Text style={styles.title}> Movimentações</Text>
      <FlatList 
        style={styles.list}
        data={list}
        keyExtractor={(item => String(item.id))}   
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Text>Teste</Text>}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    marginLeft: 14,
    marginRight:14,
    margintTop  :14,
  },
  list:{
    marginStart:14,
    marginEnd:14
  }
});
