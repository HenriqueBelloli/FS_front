import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ThemeColors } from '../../standards';

export default function Movements({ data }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.date}>{data.date}</Text>

      <View style={styles.content}>

        <View>
          <Text style={styles.label}>{data.label}</Text>
          <Text style={styles.category}>
            {data.category} | {data.account}
          </Text>
        </View>

        <Text style={data.type === 1 ? styles.incomes : styles.expenses}>R$ {data.value}</Text>

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
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8,
  },
  date: {
    color: ThemeColors.fonte,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: ThemeColors.fonte,
  },
  category: {
    fontSize: 12,
    color: ThemeColors.fonteSecundaria,
  },
  incomes: {
    fontSize: 16,
    color: ThemeColors.verdeReceitas,
    fontWeight: 'bold',
  },
  expenses: {
    fontSize: 16,
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
