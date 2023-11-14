import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ThemeColors } from '../../standards';

export default function Categories({ data }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={data.type === 1 ? styles.incomes : styles.expenses}>{data.label}</Text>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.actionButton}>
            <View>
              <AntDesign name="edit" size={25} color={ThemeColors.fonteSecundaria} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View>
              <AntDesign name="delete" size={25} color={ThemeColors.fonteSecundaria} />
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
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 8,
    padding: 5,
    marginLeft: 10,
  },
  date: {
    color: ThemeColors.fonte,
    fontWeight: 'bold',
  },
  incomes: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ThemeColors.verdeReceitas,
  },
  expenses: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ThemeColors.vermelhoDespesas,
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
