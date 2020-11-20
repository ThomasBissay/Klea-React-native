import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import HeaderKlea from '../component/HeaderKlea';
import { RootState } from '../redux/store';
import { style } from '../styles/styles';

export default function ProfileScreen(props: any): JSX.Element {
  const data = useSelector((state: RootState) => state.profile);

  return (
    <View style={style.container}>
      <HeaderKlea
        title="Profil"
        handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        leftIconName="menu"
        rightIconName="edit"
        handleRightClick={() => props.navigation.navigate('EditProfil')}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.body}>
          <View style={{ alignItems: 'center' }}>
            {/* eslint-disable-next-line global-require */}
            <Image source={data.imageProfil !== '' ? { uri: data.imageProfil } : require('../assets/example.png')} style={style.avatar} />
            <Text style={style.name}>
              {data.firstName !== '' ? `${data.firstName} ${data.lastName}` : 'Anonyme'}
              {' '}
            </Text>
          </View>
          <View style={style.infoBox}>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/material-sharp/24/000000/important-mail.png' }}
                resizeMode="contain"
              />
              <Text style={style.info}>{data.email !== '' ? data.email : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/material-sharp/24/000000/gender.png' }}
                resizeMode="contain"
              />
              <Text style={style.info}>{data.gender !== '' ? data.gender : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/material-rounded/24/000000/home.png' }}
                resizeMode="contain"
              />
              <Text style={style.info}>{data.address !== '' ? data.address : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/android/24/000000/phone.png' }}
                resizeMode="contain"
              />
              <Text style={style.info}>{data.phoneNumber !== '' ? data.phoneNumber : 'Non renseigné'}</Text>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/metro/26/000000/info.png' }}
                resizeMode="contain"
              />
              <Text style={style.info}>{data.bio !== '' ? data.bio : 'Non renseigné'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
