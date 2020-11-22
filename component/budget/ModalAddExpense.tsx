import React, { useEffect, useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import ModalInput from './ModalInput';
import { addExpense, deleteExpense, modifyExpense } from '../../redux/actions/expenseUpdater';
import { Expense } from '../../redux/actions/types';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginTop: 200,
  },
  transparentBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 50,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  modalInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#5D9783',
    marginVertical: 10,
  },
  timeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#5D9783',
    marginVertical: 10,
    marginLeft: 10,
    paddingRight: 5,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#5D9783',
    marginLeft: 20,
  },
  deleteText: {
    fontSize: 14,
    color: '#D4473B',
  },
});

interface PropsModalExpense {
  modalState: boolean,
  modalType: string,
  expense: Expense,
  closeModal: () => void,
}

enum DatePickerModes {
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  countdown = 'countdown',
}

const ModalAddExpense = ({
  modalState, modalType, expense, closeModal,
}: PropsModalExpense): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [categorie, setCategorie] = useState<string>('Autre');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<DatePickerModes>(DatePickerModes.date);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalState) {
      if (modalType === 'Modify') {
        setTitle(expense.title);
        setPrice(expense.price.toString());
        setCategorie(expense.categorie);
        setDate(new Date(expense.date));
      }
      return;
    }
    setTitle('');
    setPrice('');
    setCategorie('Autre');
    setDate(new Date());
    // ...
  }, [modalState]);

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: DatePickerModes) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(DatePickerModes.date);
  };

  const showTimepicker = () => {
    showMode(DatePickerModes.time);
  };

  function onValidate() {
    const newExpense = {
      id: -1,
      title,
      price: +price,
      categorie,
      date: moment(date).format(),
    };
    dispatch(
      addExpense(newExpense),
    );
    closeModal();
  }

  function onModify() {
    const newExpense = {
      id: expense.id,
      title,
      price: +price,
      categorie,
      date: moment(date).format(),
    };
    dispatch(
      modifyExpense(expense.id, newExpense),
    );
    closeModal();
  }

  function onDelete() {
    dispatch(
      deleteExpense(expense.id),
    );
    closeModal();
  }

  function changePickedCategorie(newCategorie: number | string) {
    setCategorie(newCategorie.toString());
  }

  const footer = () => {
    if (modalType === 'Add') {
      return (
        <View style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: 20 }}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.actionText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onValidate}>
            <Text style={styles.actionText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity onPress={onDelete} style={{ marginRight: 'auto' }}>
          <Text style={styles.deleteText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.actionText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onModify}>
          <Text style={styles.actionText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalState}
    >
      <View style={styles.transparentBackground}>
        <View style={styles.container}>
          <Text style={styles.modalTitle}>{modalType === 'Add' ? 'Ajouter une dépense' : 'Modifier une dépense'}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ModalInput
              onChangeText={(text: string) => setTitle(text)}
              placeholder="Intitulé"
              value={title}
              keyboardType="default"
            />
            <Text style={{ marginLeft: 20 }}>{categorie}</Text>
            <View style={{ width: 50 }}>
              <Picker
                selectedValue={categorie}
                onValueChange={(value) => changePickedCategorie(value)}
              >
                <Picker.Item label="Logement" value="Logement" />
                <Picker.Item label="Transport" value="Transport" />
                <Picker.Item label="Loisir" value="Loisir" />
                <Picker.Item label="Alimentation" value="Alimentation" />
                <Picker.Item label="Autre" value="Autre" />
              </Picker>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <ModalInput onChangeText={(text: string) => setPrice(text)} placeholder="Prix" value={price} keyboardType="numeric" />
            <Text style={{ marginHorizontal: 15, fontSize: 20 }}>€</Text>
          </View>
          <View style={styles.lineContainer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="event" color="#5D9783" />
              <TouchableOpacity onPress={showDatepicker} style={styles.timeInput}>
                <Text>{moment(date).format('DD/MM/yy')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Icon onPress={showTimepicker} name="schedule" color="#5D9783" />
              <TouchableOpacity onPress={showTimepicker} style={styles.timeInput}>
                <Text>{moment(date).format('HH:mm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={(event: Event, newDate: Date | undefined) => onChange(event, newDate)}
          />
          )}
          {footer()}
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddExpense;
