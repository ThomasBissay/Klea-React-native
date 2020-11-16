import React, {useEffect, useState} from 'react';
import {
    Platform,
    Dimensions,
    Image,
    ScrollView,
    Text, TextInput,
    View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import FeatherIcon from "react-native-vector-icons/Feather"
import AlertAsync from "react-native-alert-async"
import HeaderKlea from "../component/HeaderKlea";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../redux/store";
import {updateProfile} from "../redux/actions/profileUpdater";
import {stylesPortrait, stylesLandscape} from "../styles/styles";

export default function EditProfil (props: any) : JSX.Element {

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const getStyle = () => {
        if (orientation === 'landscape') {
            return stylesLandscape;
        } else {
            return stylesPortrait;
        }
    }

    // Redux //
    const data = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();

    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');
    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [email, setEmail] = useState(data.email);
    const [gender, setGender] = useState(data.gender);
    const [address, setAddress] = useState(data.address);
    const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
    const [bio, setBio] = useState(data.bio);
    const [imageProfil, setImageProfil] = useState(data.imageProfil);

    // (componentDidMount) //
    useEffect(() => {
        getPermissionAsync().then();
    }, []);

    Dimensions.addEventListener('change', () => {
        setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    const _updateInfos = () => {
        dispatch(
            updateProfile({
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
                address: address,
                phoneNumber: phoneNumber,
                bio: bio,
                imageProfil: imageProfil,
            })
        )
        props.navigation.goBack();
    }

    const getPermissionAsync = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Nous avons besoin d\'avoir accès à votre album photo pour importer une photo de profil')
            }
            else {
                const { status } = await Permissions.askAsync(Permissions.CAMERA);
                if (status !== 'granted') {
                    alert('Nous avons besoin d\'avoir accès à votre caméra pour prendre une photo de profil')
                }
            }

        }
    };

    // Popup de choix de source de la photo //
    const myAction = async () => {
        const choice = await AlertAsync(
            'Photo de profil',
            'Choisis l\'une de ces options pour changer ta photo de profil.',
            [
                {text: 'Photo par défaut', onPress: () => 'def'},
                {text: 'Prendre une photo', onPress: () => 'cam'},
                {text: 'Importer une photo', onPress: () => 'import'},
            ],
            {
                cancelable: true,
                onDismiss: () => 'no',
            },
        );
        if (choice === 'def') {
            await _setDefaultPhoto();
        }
        else if (choice === 'cam') {
            await _pickImageFromCamera();
        }
        else if (choice === 'import') {
            await _pickImageFromLibrary();
        }
    };

    // Photo par défaut //
    const _setDefaultPhoto = async() => {
        setImageProfil("")
        console.log("default photo asked!");
    };

    // Photo à partir de la gallerie //
    const _pickImageFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            setImageProfil(result.uri);
            console.log("library photo asked");
        }
    };

    // Photo à partir de la caméra //
    const _pickImageFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            setImageProfil(result.uri);
            console.log("camera photo asked!");
        }
    };

    return (
        <View style={getStyle().container}>
            <HeaderKlea title={"Editer profil"} handleMenu={() => props.navigation.goBack()}
                        leftIconName={"close"} rightIconName={"check"} handleRightClick={() => _updateInfos()}/>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={getStyle().body}>
                    <View>
                        <Image source={imageProfil !== "" ? {uri: imageProfil} : require("../assets/example.png")} style={getStyle().avatar}/>
                        <View style={getStyle().putEditIcon}>
                            <FeatherIcon name="camera" size={15} onPress={myAction} style={getStyle().infoIconEditPhoto}/>
                        </View>
                    </View>
                    <View style={getStyle().infoBoxEdit}>
                        <View style={getStyle().infoContainerNames}>
                            <View style={{alignItems: 'stretch', paddingLeft: '2%', paddingRight: '2%'}}>
                                <Text style={getStyle().title_section}>Nom</Text>
                                <TextInput style={getStyle().input} placeholder="Quel est ton nom ?"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={lastName}
                                           maxLength={20} onChangeText={text => setLastName(text)}
                                />
                            </View>
                            <View style={{alignItems: 'stretch', paddingLeft: '2%', paddingRight: '2%'}}>
                                <Text style={getStyle().title_section}>Prénom</Text>
                                <TextInput style={getStyle().input} placeholder="Quel est ton prénom ?"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={firstName}
                                           maxLength={20} onChangeText={text => setFirstName(text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-sharp/24/000000/important-mail.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Mail de contact</Text>
                                <TextInput style={getStyle().input} placeholder="Sur quelle mail peut-on te contacter ?"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={email}
                                           keyboardType={"email-address"} maxLength={30} onChangeText={text => setEmail(text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-rounded/24/000000/home.png'}}
                                   resizeMode="contain"
                            />
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Adresse</Text>
                                <TextInput style={getStyle().input} placeholder="Où habites-tu ?"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={address}
                                           maxLength={40} onChangeText={text => setAddress(text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-sharp/24/000000/gender.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Genre</Text>
                                <TextInput style = {getStyle().input} placeholder="Homme/Femme/Autre"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={gender}
                                           maxLength={15} onChangeText={text => setGender(text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/android/24/000000/phone.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Téléphone</Text>
                                <TextInput style = {getStyle().input} placeholder="Quel est ton numéro de téléphone ?"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={phoneNumber}
                                           keyboardType={"phone-pad"} maxLength={12} onChangeText={text => setPhoneNumber(text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/metro/26/000000/info.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Informations complémentaires</Text>
                                <TextInput style = {getStyle().input} placeholder="À propos de toi"
                                           placeholderTextColor="#9C9593" autoCapitalize="none" defaultValue={bio}
                                           maxLength={120} onChangeText={text => setBio(text)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
