import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import { ThemeColors } from '../../standards';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Header name="User" />

      <Balance navigation = {navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.screenBackground,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
});
