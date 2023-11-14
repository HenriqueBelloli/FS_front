import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList, StatusBar } from 'react-native';
import { ThemeColors } from '../../standards';
import Categories from '../../components/Categories';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const list0 = [
  {
    id: 1,
    label: 'Serviços',
    type: 0,
  },
  {
    id: 2,
    label: 'Moradia',
    type: 0,
  },
  {
    id: 3,
    label: 'Alimentação',
    type: 0,
  },
  {
    id: 4,
    label: 'Doação',
    type: 0,
  },
  {
    id: 5,
    label: 'Mercado',
    type: 0,
  },
];

const list1 = [
  {
    id: 1,
    label: 'Salário',
    type: 1,
  },
  {
    id: 2,
    label: 'Aluguel',
    type: 1,
  },
  {
    id: 3,
    label: 'Bolsa de Estudos',
    type: 1,
  },
  {
    id: 4,
    label: 'Mesada',
    type: 1,
  },
];

export default function CategoryList({ navigation }) {
  const [showList1, setShowList1] = useState(true);

  const toggleList = () => {
    setShowList1(!showList1);
  };
  adicionarCategoria = () => {
    navigation.navigate('CategoryAdd');
  };
  return (
    <View  style={styles.container}>

      <View style={styles.containerHeader}>
        <Text style={styles.title}>Categorias</Text>
      </View>
    
      <View style={styles.containerContent2}>
      <TouchableOpacity style={[styles.button, styles.buttonChange]} onPress={toggleList}>
          <Text style={styles.buttonText}>Trocar Categoria</Text>
      </TouchableOpacity>
      {showList1 ? (
        <FlatList style={styles.list} data={list0} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={true} renderItem={({ item }) => <Categories data={item} />} />
      ) : (
        <FlatList style={styles.list} data={list1} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={true} renderItem={({ item }) => <Categories data={item} />} />
      )}
      <TouchableOpacity style={[styles.button2, styles.buttonChange2]}>
          <Text style={styles.buttonText}>Nova Categoria</Text>
      </TouchableOpacity>
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
  containerContent2: {
    flex: 1,
    backgroundColor: ThemeColors.cardBackground,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 18,
    margin:18,
    color: ThemeColors.fonte,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  button: {
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 20,
    width: 190,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    position: 'absolute',
    borderRadius: 25,
    marginLeft: 205,
    marginVertical: 20,
    width: 190,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonChange: {
    backgroundColor: '#3580FF2E',
  },
  buttonChange2: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: ThemeColors.fonte,
    fontWeight: 'bold',
    fontSize: 18,
  },
});