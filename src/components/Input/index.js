import React, { useState, forwardRef, useImperativeHandle, createRef } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColors } from '../../standards';

const Input = forwardRef((props, ref) => {
  const [sec, setSec] = useState(props.secureTextEntry);
  const [error, setError] = useState(false);
  const inputref = createRef();

  useImperativeHandle(ref, () => ({
    focusOnError() {
      setError(true);
      inputref.current.focus();
    },
    resetError() {
      setError(false);
    },
  }));

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: error ? ThemeColors.vermelhoErro : ThemeColors.borda }]}
        ref={inputref}
        underlineColorAndroid="transparent"
        placeholderTextColor={ThemeColors.icone}
        {...props}
        secureTextEntry={sec}
      />
      <Ionicons
        name={props.iconName}
        size={26}
        color={error ? ThemeColors.vermelhoErro : ThemeColors.icone}
        style={styles.icon}
      />
      {props.secureTextEntry && (
        <TouchableOpacity onPress={() => setSec(!sec)}>
          <Ionicons
            name={sec ? 'eye' : 'eye-off'}
            size={26}
            color={ThemeColors.icone}
            style={styles.iconSecret}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    height: 50,
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingLeft: 40,
    marginHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
  },
  icon: {
    position: 'absolute',
    left: 30,
    top: 12,
  },
  iconSecret: {
    position: 'absolute',
    right: 30,
    top: 12,
  },
});

export default Input;
