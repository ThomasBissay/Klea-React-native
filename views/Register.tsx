import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text, TextInput, TouchableHighlight,
  View,
} from 'react-native';
import axios from 'axios';

const registerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e9ee',
  },
  inputContainer: {
    width: '75%',
    marginBottom: '10%',
  },
  input: {
    backgroundColor: ' rgba(0, 0, 0, 0)',
    borderBottomColor: '#a0c0b8',
    borderBottomWidth: 1,
    height: 50,
    color: '#a0c0b8',
  },
  registerButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    padding: '2%',
    borderRadius: 5,
    backgroundColor: '#5d9783',
  },
});

export default function Login(props: any): JSX.Element {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifPassword, setVerifPassword] = useState('');
  const client = axios.create({
    baseURL: 'http://145.239.86.157:8080/',
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Bearer: '',
    },
  });
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))');

  function register() {
    if (!lastName || !firstName || !email || !verifPassword) {
      return (Alert.alert('Erreur', 'Veuillez renseigner tout les champs'));
    }
    if (!emailRegex.test(email)) {
      return (Alert.alert('Erreur', 'Veuillez renseigner un email valable'));
    }
    if (!strongRegex.test(password)) {
      return (Alert.alert('Erreur', 'Doit contenir une minuscule, une majuscule, un chiffre et minimum 8 caractères.'));
    }
    if (password !== verifPassword) {
      return (Alert.alert('Erreur', 'Les mots de passe doivent être identiques.'));
    }
    client.post('/user/', { Email: email, Pseudo: firstName, Password: password }).then((response) => {
      if (response.status === 200) {
        Alert.alert('Compte créé', 'Votre compte a bien été créer');
        props.navigation.navigate('Login');
      }
    }).catch(() => {
      Alert.alert('Erreur', 'Email ou mot de passe erroné');
    });
    return true;
  }

  return (
    <View style={registerStyle.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={registerStyle.inputContainer}>
          <Text style={{ color: '#a0c0b8', fontSize: 16 }}>Nom</Text>
          <TextInput style={registerStyle.input} underlineColorAndroid="transparent" onChangeText={(value) => setLastName(value)} />
        </View>
        <View style={registerStyle.inputContainer}>
          <Text style={{ color: '#a0c0b8', fontSize: 16 }}>Prénom</Text>
          <TextInput style={registerStyle.input} underlineColorAndroid="transparent" onChangeText={(value) => setFirstName(value)} />
        </View>
        <View style={registerStyle.inputContainer}>
          <Text style={{ color: '#a0c0b8', fontSize: 16 }}>Email</Text>
          <TextInput style={registerStyle.input} underlineColorAndroid="transparent" onChangeText={(value) => setEmail(value)} />
        </View>
        <View style={registerStyle.inputContainer}>
          <Text style={{ color: '#a0c0b8', fontSize: 16 }}>Mot de passe</Text>
          <TextInput style={registerStyle.input} secureTextEntry underlineColorAndroid="transparent" onChangeText={(value) => setPassword(value)} />
        </View>
        <View style={registerStyle.inputContainer}>
          <Text style={{ color: '#a0c0b8', fontSize: 16 }}>Vérification du mot de passe</Text>
          <TextInput style={registerStyle.input} secureTextEntry underlineColorAndroid="transparent" onChangeText={(value) => setVerifPassword(value)} />
        </View>
        <TouchableHighlight style={registerStyle.registerButton} onPress={() => register()}>
          <Text style={{ color: '#E4E9EE', fontSize: 16 }}>Envoyer</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
