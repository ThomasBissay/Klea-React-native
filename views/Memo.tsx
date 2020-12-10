import { DrawerActions } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TouchableOpacity, TextInput, FlatList, Modal, Picker, Alert, KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import HeaderKlea from '../component/HeaderKlea';
import { style } from '../styles/styles';
import { RootState } from '../redux/store';
import { addMemo, deleteMemo } from '../redux/actions/memoUpdater';
import { Memo } from '../redux/actions/types';
import { MenuNavigatorParamList } from '../utils/NavigationTypes';

type MemoScreenNavigationProp = DrawerNavigationProp<
MenuNavigatorParamList,
'Memos'
>;

type PropsMemo = {
  navigation: MemoScreenNavigationProp;
};

export default function MemoScreen({ navigation }: PropsMemo): JSX.Element {
  const dataMemo = useSelector((state: RootState) => state.memos);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ f1: true, f2: true, f3: true });
  const [filteredData, setFilteredData] = useState<Memo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [currMemo, setCurrMemo] = useState(
    {
      id: '',
      title: '',
      text: '',
      tag: 'À faire',
      tagColor: '#7badde',
    },
  );

  const handleSearch = () => {
    const newData = dataMemo.memos.filter((memo) => {
      let tag = false;
      switch (memo.tagColor) {
        case '#7badde':
          if (filters.f1) tag = true;
          break;
        case '#fcaf83':
          if (filters.f2) tag = true;
          break;
        case '#d4483b':
          if (filters.f3) tag = true;
          break;
        default:
          break;
      }
      if (!tag) return (0);
      return (memo.title.indexOf(search) > -1);
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    handleSearch();
  }, [search, filters, dataMemo]);

  const handleFilters = (target: string) => {
    switch (target) {
      case 'f1': {
        setFilters({ ...filters, f1: !filters.f1 });
        break;
      }
      case 'f2': {
        setFilters({ ...filters, f2: !filters.f2 });
        break;
      }
      case 'f3': {
        setFilters({ ...filters, f3: !filters.f3 });
        break;
      }
      default:
        break;
    }
  };

  const handleLabel = (color: string) => {
    switch (color) {
      case '#7badde':
        return ('À faire');
      case '#fcaf83':
        return ('Prioritaire');
      case '#d4483b':
        return ('Urgent');
      default:
        return ('À faire');
    }
  };

  const guidGenerator = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
  };

  const clearCurrMemo = () => {
    setCurrMemo({
      id: '', title: '', text: '', tag: 'À faire', tagColor: '#7badde',
    });
  };

  const modifyMemo = (item: Memo) => {
    setCurrMemo({
      id: item.id.toString(),
      title: item.title,
      text: item.text,
      tag: item.tag,
      tagColor: item.tagColor,
    });
    setModalVisible(true);
  };

  const delMemo = (id: string) => {
    dispatch(
      deleteMemo(id),
    );
  };

  const saveMemo = () => {
    if (currMemo.title && currMemo.text) {
      if (currMemo.id) {
        delMemo(currMemo.id);
      }
      dispatch(
        addMemo({
          id: guidGenerator(),
          title: currMemo.title,
          text: currMemo.text,
          tag: currMemo.tag,
          tagColor: currMemo.tagColor,
        }),
      );
      clearCurrMemo();
      setModalVisible(false);
    } else Alert.alert('', 'Veuillez remplir tout les champs');
  };

  const modal = () => (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        clearCurrMemo();
      }}
    >
      <View style={style.modal}>
        <View style={{ height: '10%', alignItems: 'center' }}>
          <Text style={style.memoTitle}>Voir / Editer mémo</Text>
        </View>
        {/* Champ Titre */}
        <View style={[style.modalView, { height: '10%' }]}>
          <Text style={style.title_section}>Titre</Text>
          <View style={[style.modalInputContainer, { height: '60%' }]}>
            <TextInput
              style={style.modalInput}
              defaultValue={currMemo.title}
              placeholder="Ajouter un titre"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={(newTitle) => setCurrMemo({ ...currMemo, title: newTitle })}
            />
          </View>
        </View>
        {/* Selecteur Catégorie */}
        <View style={[style.modalView, { height: '10%' }]}>
          <Text style={style.title_section}>Catégorie</Text>
          <View style={{
            borderWidth: 0.8,
            borderRadius: 5,
            marginTop: '3%',
          }}
          >
            <Picker
              selectedValue={currMemo.tagColor}
              style={style.picker}
              onValueChange={(itemValue) => setCurrMemo({
                ...currMemo,
                tag: handleLabel(itemValue),
                tagColor: itemValue,
              })}
            >
              <Picker.Item label="À faire" value="#7badde" />
              <Picker.Item label="Prioritaire" value="#fcaf83" />
              <Picker.Item label="Urgent" value="#d4483b" />
            </Picker>
          </View>
        </View>
        {/* Champ Contenu */}
        <View style={[style.modalView, { height: '50%' }]}>
          <Text style={style.title_section}>Contenu</Text>
          <View style={[style.modalInputContainer, { height: '80%' }]}>
            <TextInput
              style={style.modalInput}
              defaultValue={currMemo.text}
              placeholder="Ajouter des tâches, des informations ..."
              autoCapitalize="none"
              multiline
              underlineColorAndroid="transparent"
              onChangeText={(newText) => setCurrMemo({ ...currMemo, text: newText })}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity
            style={style.modalButton}
            onPress={() => saveMemo()}
          >
            <Text style={style.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={style.container}>
      {/* Header */}
      <HeaderKlea
        title="Mémos"
        handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        leftIconName="menu"
        rightIconName="none"
        handleRightClick={() => ''}
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={style.header}
      >
        <View style={style.searchBar}>
          <Image
            style={style.infoIcon}
            source={{ uri: 'https://img.icons8.com/material-sharp/24/000000/search.png' }}
            resizeMode="contain"
          />
          <TextInput
            style={style.searchInput}
            placeholder="Rechercher par titre ..."
            maxLength={40}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View style={style.filtersBar}>
          <TouchableOpacity
            style={[style.filterButton, filters.f1
              ? { backgroundColor: '#7badde', borderColor: '#7badde' }
              : { backgroundColor: 'white', borderColor: '#7badde' }]}
            onPress={() => handleFilters('f1')}
          >
            <Text style={[style.buttonText, !filters.f1 ? { color: '#7badde' }
              : { color: 'white' }]}
            >
              À faire
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.filterButton, filters.f2
              ? { backgroundColor: '#fcaf83', borderColor: '#fcaf83' }
              : { backgroundColor: 'white', borderColor: '#fcaf83' }]}
            onPress={() => handleFilters('f2')}
          >
            <Text style={[style.buttonText, !filters.f2 ? { color: '#fcaf83' }
              : { color: 'white' }]}
            >
              Prioritaire
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.filterButton, filters.f3
              ? { backgroundColor: '#d4483b', borderColor: '#d4483b' }
              : { backgroundColor: 'white', borderColor: '#d4483b' }]}
            onPress={() => handleFilters('f3')}
          >
            <Text style={[style.buttonText, !filters.f3 ? { color: '#d4483b' }
              : { color: 'white' }]}
            >
              Urgent
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={style.body}>
        <View>
          <TouchableOpacity
            style={style.memoButton}
            onPress={() => { setModalVisible(true); }}
          >
            <Image
              style={style.memoIcon}
              source={{ uri: 'https://img.icons8.com/pastel-glyph/64/5d9683/plus--v1.png' }}
              resizeMode="contain"
            />
            <Text style={{ margin: '4%', marginLeft: '22%', color: '#5d9683' }}>Nouveau mémo</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: '2%' }}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={style.memoItem} onPress={() => modifyMemo(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={style.memoTitle}>{item.title}</Text>
                  <TouchableOpacity
                    style={style.memoDelete}
                    onPress={() => delMemo(item.id)}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={{ uri: 'https://img.icons8.com/material-sharp/48/d4483b/delete.png' }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={style.memoText}>{item.text}</Text>
                <TouchableOpacity
                  style={[style.memoTag, { backgroundColor: item.tagColor }]}
                >
                  <Text style={{ color: 'white' }}>{item.tag}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
          {modal()}
        </View>
      </View>
    </View>
  );
}
