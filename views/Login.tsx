import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { RootState } from '../redux/store';
import { style } from '../styles/styles';
import updateProfile from '../redux/actions/profileUpdater';

const loginStyle = StyleSheet.create({
  icon: {
    color: 'white',
    fontSize: 150,
  },
  iconText: {
    color: 'white',
    fontSize: 60,
    marginBottom: 50,
  },
  filterBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#5D9783',
  },
  inputContainer: {
    width: '75%',
    marginBottom: '10%',
  },
  input: {
    backgroundColor: ' rgba(0, 0, 0, 0)',
    borderBottomColor: '#E4E9EE',
    borderBottomWidth: 1,
    height: 50,
    color: '#E4E9EE',
  },
  loginButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    padding: '2%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  registerButton: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    padding: '2%',
    borderRadius: 5,
    borderColor: '#E4E9EE',
    borderWidth: 1,
  },
});

export default function Login(props: any): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const client = axios.create({
    baseURL: 'http://145.239.86.157:8080/',
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Bearer: '',
    },
  });
  const image = require('../assets/images/loginBackground.png');

  const data = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  function saveData(newData: AxiosResponse) {
    dispatch(
      updateProfile({
        firstName: newData.data.user.FirstName,
        lastName: newData.data.user.LastName,
        email: newData.data.user.Email,
        gender: data.gender,
        address: data.address,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        imageProfil: data.imageProfil,
        connected: true,
      }),
    );
  }

  function login() {
    if (!email || !password) {
      return (Alert.alert('Erreur', 'Veuillez remplir tout les champs'));
    }
    client.post('/user/auth', { Email: email, Password: password }).then((response) => {
      if (response.status === 200) {
        saveData(response);
        props.navigation.navigate('Menu');
      }
    }).catch(() => {
      Alert.alert('Erreur', 'Email ou mot de passe erroné');
    });
    return true;
  }

  useEffect(() => {
    if (data.connected) {
      props.navigation.navigate('Menu');
    }
  }, []);

  return (
    <View style={style.container}>
      <ImageBackground source={image} style={loginStyle.image} imageStyle={{ opacity: 0.4 }}>
        <View style={loginStyle.filterBackground}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="globe" type="font-awesome" iconStyle={loginStyle.icon} />
            <Text style={loginStyle.iconText}>KLEA</Text>
            <View style={loginStyle.inputContainer}>
              <Text style={{ color: '#E4E9EE', fontSize: 16 }}>Email</Text>
              <TextInput
                style={loginStyle.input}
                underlineColorAndroid="transparent"
                onChangeText={(value) => setEmail(value)}
              />
            </View>
            <View style={loginStyle.inputContainer}>
              <Text style={{ color: '#E4E9EE', fontSize: 16 }}>Mot de passe</Text>
              <TextInput
                style={loginStyle.input}
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <TouchableHighlight style={loginStyle.loginButton} onPress={() => login()}>
              <Text style={{ color: '#5D9783', fontSize: 16 }}>Se connecter</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={loginStyle.registerButton}
              onPress={() => props.navigation.navigate('Register')}
            >
              <Text style={{ color: '#E4E9EE', fontSize: 16 }}>Créer un compte</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
