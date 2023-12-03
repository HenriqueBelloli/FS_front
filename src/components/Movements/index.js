import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { ThemeColors } from '../../standards';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';

export default function Movements({ data, onDelete, navigation }) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleEdit = () => {
    navigation.navigate('MovementAdd', { editData: data });
   };

  const handleDelete = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta movimentação?',
      [
        {
          text: 'Excluir',
          onPress: () => onDelete(data.id),
          style: 'destructive',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.date}> {format(new Date(data.data), 'dd/MM/yyyy')}</Text>

      <View style={styles.content}>
        <View style={styles.containerTexto}>
          <Text style={styles.label}>{data.descricao}</Text>
          <Text style={styles.category}>
            {data.categoria.descricao} | {data.conta.descricao}
          </Text>
        </View>

        <Text style={data.tipo === 1 ? styles.incomes : styles.expenses}>
          {formatter.format(data.valor)}
        </Text>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <View>
              <Icon name="pencil-outline" type="ionicon" color={ThemeColors.fonteSecundaria} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <View>
              <Icon name="trash-outline" type="ionicon" color={ThemeColors.fonteSecundaria} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    marginTop: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  containerTexto:{
    flex: 1
   },
  date: {
    color: ThemeColors.fonte,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ThemeColors.fonte,
  },
  category: {
    fontSize: 14,
    color: ThemeColors.fonteSecundaria,
  },
  incomes: {
    fontSize: 18,
    color: ThemeColors.verdeReceitas,
    fontWeight: 'bold',
  },
  expenses: {
    fontSize: 18,
    color: ThemeColors.vermelhoDespesas,
    fontWeight: 'bold',
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginLeft: 12,
  },
});
