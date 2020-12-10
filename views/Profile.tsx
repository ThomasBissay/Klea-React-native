import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { DrawerActions, CompositeNavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import HeaderKlea from '../component/HeaderKlea';
import { RootState } from '../redux/store';
import { style } from '../styles/styles';
import DefaultImg from '../assets/example.png';
import { MenuNavigatorParamList, ProfileNavigatorParamList } from '../utils/NavigationTypes';

type ProfileScreenNavigationProp = CompositeNavigationProp<
DrawerNavigationProp<MenuNavigatorParamList, 'Profil'>,
StackNavigationProp<ProfileNavigatorParamList>
>;

type PropsProfil = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: PropsProfil): JSX.Element {
  const data = useSelector((state: RootState) => state.profile);

  return (
    <View style={style.container}>
      <HeaderKlea
        title="Profil"
        handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        leftIconName="menu"
        rightIconName="edit"
        handleRightClick={() => navigation.navigate('EditProfil')}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.body}>
          <View style={{ alignItems: 'center' }}>
            <Image source={data.imageProfil !== '' ? { uri: data.imageProfil } : DefaultImg} style={style.avatar} />
            <Text style={style.name}>
              {data.firstName !== '' ? `${data.firstName} ${data.lastName}` : 'Anonyme'}
              {' '}
            </Text>
          </View>
          <View style={style.infoBox}>
            <View style={style.infoContainer}>
              <Icon
                name="at"
                style={{ marginRight: 20 }}
                size={20}
              />
              <Text style={style.info}>{data.email !== '' ? data.email : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Icon
                name="gender-male-female"
                style={{ marginRight: 20 }}
                size={20}
              />
              <Text style={style.info}>{data.gender !== '' ? data.gender : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Icon
                name="city"
                style={{ marginRight: 20 }}
                size={20}
              />
              <Text style={style.info}>{data.address !== '' ? data.address : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Icon
                name="cellphone"
                style={{ marginRight: 20 }}
                size={20}
              />
              <Text style={style.info}>{data.phoneNumber !== '' ? data.phoneNumber : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Icon
                name="information-outline"
                style={{ marginRight: 20 }}
                size={20}
              />
              <Text style={style.info}>{data.bio !== '' ? data.bio : 'Non renseigné'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
