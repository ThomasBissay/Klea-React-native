import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text, TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AlertAsync from 'react-native-alert-async';
import { useSelector, useDispatch } from 'react-redux';
import HeaderKlea from '../component/HeaderKlea';
import { RootState } from '../redux/store';
import updateProfile from '../redux/actions/profileUpdater';
import { style } from '../styles/styles';
import DefaultImg from '../assets/example.png';

export default function EditProfil(props: any) : JSX.Element {
  // Redux //
  const data = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [gender, setGender] = useState(data.gender);
  const [address, setAddress] = useState(data.address);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [bio, setBio] = useState(data.bio);
  const [imageProfil, setImageProfil] = useState(data.imageProfil);

  const updateInfos = () => {
    dispatch(
      updateProfile({
        firstName,
        lastName,
        email,
        gender,
        address,
        phoneNumber,
        bio,
        imageProfil,
        connected,
      }),
    );
    props.navigation.goBack();
  };

  // Photo par défaut //
  const setDefaultPhoto = async () => {
    setImageProfil('');
  };

  // Photo à partir de la gallerie //
  const pickImageFromLibrary = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    let authorize = false;
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        authorize = true;
      }
    } else authorize = true;
    if (authorize) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        setImageProfil(result.uri);
      }
    }
  };

  // Photo à partir de la caméra //
  const pickImageFromCamera = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA);
    let authorize = false;
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermission.status === 'granted') {
        authorize = true;
      }
    } else authorize = true;
    if (authorize) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setImageProfil(result.uri);
      }
    }
  };

  // Popup de choix de source de la photo //
  const myAction = async () => {
    const choice = await AlertAsync(
      'Photo de profil',
      'Choisis l\'une de ces options pour changer ta photo de profil.',
      [
        { text: 'Photo par défaut', onPress: () => 'def' },
        { text: 'Prendre une photo', onPress: () => 'cam' },
        { text: 'Importer une photo', onPress: () => 'import' },
      ],
      {
        cancelable: true,
        onDismiss: () => 'no',
      },
    );
    if (choice === 'def') {
      await setDefaultPhoto();
    } else if (choice === 'cam') {
      await pickImageFromCamera();
    } else if (choice === 'import') {
      await pickImageFromLibrary();
    }
  };

  return (
    <View style={style.container}>
      <HeaderKlea
        title="Editer profil"
        handleMenu={() => props.navigation.goBack()}
        leftIconName="close"
        rightIconName="check"
        handleRightClick={() => updateInfos()}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.body}>
          <View>
            <Image source={imageProfil !== '' ? { uri: imageProfil } : DefaultImg} style={style.avatar} />
            <View style={style.putEditIcon}>
              <FeatherIcon name="camera" size={15} onPress={myAction} style={style.infoIconEditPhoto} />
            </View>
          </View>
          <View style={style.infoBoxEdit}>
            <View style={style.infoContainerNames}>
              <View style={{ alignItems: 'stretch', paddingLeft: '2%', paddingRight: '2%' }}>
                <Text style={style.title_section}>Nom</Text>
                <TextInput
                  style={style.input}
                  placeholder="Quel est ton nom ?"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={lastName}
                  maxLength={20}
                  onChangeText={(text) => setLastName(text)}
                />
              </View>
              <View style={{ alignItems: 'stretch', paddingLeft: '2%', paddingRight: '2%' }}>
                <Text style={style.title_section}>Prénom</Text>
                <TextInput
                  style={style.input}
                  placeholder="Quel est ton prénom ?"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={firstName}
                  maxLength={20}
                  onChangeText={(text) => setFirstName(text)}
                />
              </View>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/material-sharp/24/000000/important-mail.png' }}
                resizeMode="contain"
              />
              <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Text style={style.title_section}>Mail de contact</Text>
                <TextInput
                  style={style.input}
                  placeholder="Sur quelle mail peut-on te contacter ?"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={email}
                  keyboardType="email-address"
                  maxLength={30}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/material-rounded/24/000000/home.png' }}
                resizeMode="contain"
              />
              <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Text style={style.title_section}>Adresse</Text>
                <TextInput
                  style={style.input}
                  placeholder="Où habites-tu ?"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={address}
                  maxLength={40}
                  onChangeText={(text) => setAddress(text)}
                />
              </View>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/material-sharp/24/000000/gender.png' }}
                resizeMode="contain"
              />
              <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Text style={style.title_section}>Genre</Text>
                <TextInput
                  style={style.input}
                  placeholder="Homme/Femme/Autre"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={gender}
                  maxLength={15}
                  onChangeText={(text) => setGender(text)}
                />
              </View>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/android/24/000000/phone.png' }}
                resizeMode="contain"
              />
              <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Text style={style.title_section}>Téléphone</Text>
                <TextInput
                  style={style.input}
                  placeholder="Quel est ton numéro de téléphone ?"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={phoneNumber}
                  keyboardType="phone-pad"
                  maxLength={12}
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              </View>
            </View>
            <View style={style.infoContainer}>
              <Image
                style={style.infoIcon}
                source={{ uri: 'https://img.icons8.com/metro/26/000000/info.png' }}
                resizeMode="contain"
              />
              <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Text style={style.title_section}>Informations complémentaires</Text>
                <TextInput
                  style={style.input}
                  placeholder="À propos de toi"
                  placeholderTextColor="#9C9593"
                  autoCapitalize="none"
                  defaultValue={bio}
                  maxLength={120}
                  onChangeText={(text) => setBio(text)}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
