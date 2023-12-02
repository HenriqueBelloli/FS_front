import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeColors } from '../../standards';
import { AntDesign } from '@expo/vector-icons';

const Select = ({ options, selectedValue, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(selectedValue);

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % options.length;
    setSelectedIndex(newIndex);
    onSelect(newIndex+1);
  };

  const handlePrev = () => {
    const newIndex = (selectedIndex - 1 + options.length) % options.length;
    setSelectedIndex(newIndex);
    onSelect(newIndex+1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrev}>
        <AntDesign name="left" size={20} color={ThemeColors.fonteSecundaria} />
      </TouchableOpacity>

      <Text style={styles.selectedOption}>{options[selectedIndex]}</Text>

      <TouchableOpacity onPress={handleNext}>
        <AntDesign name="right" size={20} color={ThemeColors.fonteSecundaria} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 10,
    color: ThemeColors.fonte,
    fontWeight: 'bold',
  },
  selectedOption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 80,
    color: ThemeColors.fonte,
  },
});

export default Select;
