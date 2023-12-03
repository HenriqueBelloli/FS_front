import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { ThemeColors } from '../../standards';
import { Icon } from 'react-native-elements';

export default function Account({ data, onDelete, navigation }) {
  const handleEdit = () => {
    navigation.navigate('AccountAdd', { editData: data });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta conta?',
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
      <Text style={styles.date}>{data.date}</Text>

      <View style={styles.content}>
        <View>
          <Text style={styles.label}>{data.descricao}</Text>
          <Text style={styles.value}>
            {Number(data.saldo).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        </View>

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
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ThemeColors.fonte,
  },
  value: {
    fontSize: 16,
    color: ThemeColors.fonteSecundaria,
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
