import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert, Pressable } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ApiService from '../../services/apiService';
import Button from '../../components/Button';
import { Icon } from 'react-native-elements';
import { ThemeColors } from '../../standards';
import { useRef } from 'react';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const MovementAdd = ({ navigation }) => {
  const formatDate = (rawDate, invertido) => {
    let date = new Date(rawDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return invertido ? `${year}/${month}/${day}` : `${day}/${month}/${year}`;
  };

  const apiService = new ApiService();
  const route = useRoute();
  const editData = route.params?.editData || null;
  const paramTipo =
    route.params && route.params.tipo
      ? route.params.tipo
      : editData && editData.tipo
      ? editData.tipo
      : '1';
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const [valor, setValor] = useState(
    editData && editData.valor ? formatter.format(editData.valor) : ''
  );
  let valorRef = useRef(null);
  const [data, setData] = useState(
    editData && editData.data ? new Date(editData.data) : new Date()
  );
  const [dataDisplay, setDataDisplay] = useState(
    editData && editData.data ? formatDate(editData.data) : ''
  );
  const [showPicker, setshowPicker] = useState(false);
  const [descricao, setDescricao] = useState(editData?.descricao || '');
  const [conta, setConta] = useState(editData?.conta.id || '');
  const [categoria, setCategoria] = useState(editData?.categoria.id || '');

  const [listaContas, setListaContas] = useState('');
  const [listaCategorias, setListaCategorias] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contas = await apiService.request('GET', 'contas/usuarioContas', {
          usuarioId: global.usuarioId,
        });

        setListaContas(contas.data);

        if (editData && editData.conta) {
          // Mover o item correspondente para a frente da lista
          const updatedContas = [
            editData.conta,
            ...contas.data.filter((item) => item.id !== editData.conta.id),
          ];
          setListaContas(updatedContas);
        }

        const categorias = await apiService.request('GET', 'categorias/usuarioCategorias', {
          usuarioId: global.usuarioId,
          tipo: paramTipo === '1' ? 1 : 2,
        });

        setListaCategorias(categorias.data);

        if (editData && editData.categoria) {
          // Mover o item correspondente para a frente da lista
          const updatedCategorias = [
            editData.categoria,
            ...categorias.data.filter((item) => item.id !== editData.categoria.id),
          ];
          setListaCategorias(updatedCategorias);
        }
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  async function movimentacaoCadastrar() {
    try {
      const valorSemMascara = valorRef.getRawValue();

      if (!valorSemMascara || isNaN(parseFloat(valorSemMascara))) {
        Alert.alert('Informe um valor válido');
        return;
      }

      if (dataDisplay === '') {
        Alert.alert('Informe a data');
        return;
      }

      if (descricao === '') {
        Alert.alert('Informe a descrição');
        return;
      }

      if (!Array.isArray(listaContas) || ! listaContas.length > 0) {
        Alert.alert('Não existem contas bancárias cadastradas');
        return;
      }

      if (!Array.isArray(listaCategorias) || ! listaContas.listaCategorias > 0) {
        Alert.alert('Não existem categorias cadastradas');
        return;
      }
      //Ajusta a data pra formatar YYYY-MM-DD
      const dataSplit = dataDisplay.split('/');
      const dataGravar = dataSplit[2] + '-' + dataSplit[1] + '-' + dataSplit[0];

      const dados = {
        valor: valorSemMascara,
        data: dataGravar,
        descricao: descricao,
        contaId: conta,
        categoriaId: categoria,
      };

      //Dados que são enviados apenas durante o cadastro
      if (!editData) {
        (dados.usuarioId = 1), (dados.tipo = parseInt(paramTipo, 10));
      }

      await apiService.request(
        editData ? 'PUT' : 'POST',
        `movimentacoes${editData ? `?id=${editData.id}` : ''}`,
        dados
      );

      Alert.alert(
        editData ? 'Movimentação alterada com sucesso!' : 'Movimentação criada com sucesso!',
        '',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Erro ao gravar movimentação.\n' + error.message);
    }
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      toggleDatepicker();
      setData(currentDate);
      setDataDisplay(formatDate(currentDate));
    } else {
      toggleDatepicker();
    }
  };

  const toggleDatepicker = () => {
    setshowPicker(!showPicker);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={[styles.headerText, paramTipo == '1' ? styles.incomes : styles.expenses]}>
          {editData
            ? `Editar ${paramTipo === '1' ? 'Receita' : 'Despesa'}`
            : `Cadastro de ${paramTipo === '1' ? 'Receita' : 'Despesa'}`}
        </Text>
      </View>

      <View style={styles.containerContent}>
        <View style={styles.containerInput}>
          <Icon
            name="dollar"
            type="font-awesome"
            color={ThemeColors.fonteSecundaria}
            style={styles.icon}
            size={25}
          />
          <TextInputMask
            style={styles.input}
            ref={(ref) => (valorRef = ref)}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            placeholder="Valor"
            placeholderTextColor={ThemeColors.icone}
            value={valor}
            onChangeText={(text) => setValor(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.containerInput}>
          <Icon
            name="calendar-outline"
            type="ionicon"
            color={ThemeColors.fonteSecundaria}
            style={styles.icon}
            size={25}
          />
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={data}
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

          {!showPicker && (
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.input}
                placeholder="Data"
                placeholderTextColor={ThemeColors.icone}
                value={dataDisplay}
                editable={false}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.containerInput}>
          <Icon
            name="create-outline"
            type="ionicon"
            color={ThemeColors.fonteSecundaria}
            style={styles.icon}
            size={25}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor={ThemeColors.icone}
            value={descricao}
            onChangeText={(text) => setDescricao(text)}
          />
        </View>

        <View style={styles.containerInput}>
          <Icon
            name="briefcase-outline"
            type="ionicon"
            color={ThemeColors.fonteSecundaria}
            style={styles.icon}
            size={25}
          />
          <Picker
            style={styles.input}
            selectedValue={conta}
            onValueChange={(itemValue, itemIndex) => setConta(itemValue)}>
            {Array.isArray(listaContas) &&
              listaContas.map((item) => (
                <Picker.Item key={item.id} label={item.descricao} value={item.id.toString()} />
              ))}
          </Picker>
        </View>

        <View style={styles.containerInput}>
          <Icon
            name="bookmark-outline"
            type="ionicon"
            color={ThemeColors.fonteSecundaria}
            style={styles.icon}
            size={25}
          />
          <Picker
            style={styles.input}
            selectedValue={categoria}
            onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}>
            {Array.isArray(listaCategorias) &&
              listaCategorias.map((item) => (
                <Picker.Item key={item.id} label={item.descricao} value={item.id.toString()} />
              ))}
          </Picker>
        </View>

        <Button
          label={editData ? 'Salvar' : 'Cadastrar'}
          onPress={movimentacaoCadastrar}
          primary
          marginTop={70}
        />
        <Button label="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.screenBackground,
  },
  containerHeader: {
    marginTop: statusBarHeight,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
    flex: 1,
    backgroundColor: ThemeColors.cardBackground,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  containerInput: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.borda,
    marginStart: 14,
    marginEnd: 14,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: ThemeColors.textColor,
  },
  input: {
    height: 50,
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
    color: ThemeColors.textColor,
  },
  icon: {
    marginRight: 10,
    top: 10,
  },
  incomes: {
    color: ThemeColors.verdeReceitas,
  },
  expenses: {
    color: ThemeColors.vermelhoDespesas,
  },
});

export default MovementAdd;
