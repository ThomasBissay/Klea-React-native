import React, {useEffect, useState} from 'react';
import {
    Platform,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import FeatherIcon from "react-native-vector-icons/Feather"
import AlertAsync from "react-native-alert-async"
//import { connect } from 'react-redux';

interface Props {
    firstName: string;
}

export function EditProfil (props: Props) : JSX.Element {

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [imageProfil, setImageProfil] = useState('');

    // (componentDidMount) //
    useEffect(() => {
        getPermissionAsync().then();
    }, []);

    Dimensions.addEventListener('change', () => {
        setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    const getStyle = () => {
        if (orientation === 'landscape') {
            return stylesLandscape;
        } else {
            return stylesPortrait;
        }
    }

    const _goBack = () => {
        //props.navigation.goBack();
    }

    const _handleEntry = (target: string, text: string) => {
        switch (target) {
            case lastName:
                setLastName(text);
                break;
            case firstName:
                setFirstName(text);
                break;
            case email:
                setEmail(text);
                break;
            case address:
                setAddress(text);
                break;
            case gender:
                setGender(text);
                break;
            case phoneNumber:
                setPhoneNumber(text);
                break;
            case bio:
                setBio(text);
                break;
            default:
                break;
        }
    }

    const _updateInfos = () => {
        //Redux
        //props.navigation.goBack();
        console.log("edited\n");
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
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 300}}>
                <View style={getStyle().body}>
                    <View>
                        <Image source={imageProfil !== "" ? {uri: imageProfil} : {uri: require("./assets/example.png")}}
                               style={getStyle().avatar}/>;
                        <View style={getStyle().putEditIcon}>
                            <FeatherIcon name="camera" size={15} onPress={myAction} style={getStyle().infoIconEditPhoto}/>
                        </View>
                    </View>
                    <View style={getStyle().infoBox}>
                        <View style={getStyle().infoContainerNames}>
                            <View style={{alignItems: 'stretch', paddingLeft: '2%', paddingRight: '2%'}}>
                                <Text style={getStyle().name}>Nom</Text>
                                <TextInput style={getStyle().input} placeholder="Quel est ton nom ?" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('lastName', text)}
                                />
                            </View>
                            <View style={{alignItems: 'stretch', paddingLeft: '2%', paddingRight: '2%'}}>
                                <Text style={getStyle().name}>Prénom</Text>
                                <TextInput style={getStyle().input} placeholder="Quel est ton prénom ?" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('firstName', text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-sharp/24/000000/important-mail.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Mail de contact</Text>
                                <TextInput style={getStyle().input} placeholder="Sur quelle mail peut-on te contacter ?" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('email', text)}
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
                                <TextInput style={getStyle().input} placeholder="Où habites-tu ?" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('address', text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-sharp/24/000000/gender.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Genre</Text>
                                <TextInput style = {getStyle().input} placeholder="Homme/Femme/Autre" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('gender', text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/android/24/000000/phone.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Téléphone</Text>
                                <TextInput style = {getStyle().input} placeholder="Quel est ton numéro de téléphone ?" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('phoneNumber', text)}
                                />
                            </View>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/metro/26/000000/info.png'}}
                                   resizeMode="contain"/>
                            <View style={{alignItems: 'flex-start', flex: 1}}>
                                <Text style={getStyle().title_section}>Informations complémentaires</Text>
                                <TextInput style = {getStyle().input} placeholder="À propos de toi" placeholderTextColor="#9C9593" autoCapitalize="none"
                                           onChangeText={(text) => _handleEntry('bio', text)}/>
                            </View>
                        </View>
                    </View>
                    <TouchableHighlight style={getStyle().buttonContainer} onPress={ () => _updateInfos()}>
                        <Text style={{ color: 'white'}}>VALIDER</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    );
}

// Configuration et connexion au store (Redux)
/*const mapStateToProps = (state) => {
    return {
        font: state.font,
        color: state.color,
        token: state.token,
    }
};

export default connect(mapStateToProps)(EditProfil);
*/
const stylesPortrait = StyleSheet.create({
    title_section:{
        fontSize:12,
        color: "#696969",
        marginTop:'3%',
    },
    container: {
        flex: 1,
        backgroundColor: '#e5eaeb',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "white",
        position: 'absolute',
        alignSelf:'center',
    },
    name:{
        fontSize:12,
        color:"#696969",
        marginTop: '2%',
    },
    body:{
        backgroundColor: '#e5eaeb',
        alignItems: 'center',
        padding: '4%',
    },
    infoBox:{
        paddingTop: '1%',
        marginBottom: '2%',
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '70%',
        borderRadius: 40,
        borderColor: '#bbc0c1',
        borderWidth: 0.2,
    },
    infoContainer: {
        width: '85%',
        height: '12%',
        marginBottom: '5%',
        borderColor: '#2e548c',
        borderRadius: 40,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems:'center',
    },

    infoContainerNames: {
        width: '70%',
        height: '12%',
        borderColor: '#2e548c',
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        marginBottom: '5%',
        paddingLeft: '1%',
        marginLeft: '1%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    infoIcon:{
        alignSelf: 'center',
        width: '10%',
        height: '40%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    input: {
        fontSize: 12,
        color: '#000000',
        height: '55%',
        alignSelf: 'stretch',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderColor: '#5b5b5b',
        borderBottomWidth: 1
    },
    putEditIcon: {
        paddingTop: '35%',
        paddingLeft: '20%'

    },
    infoIconEditPhoto: {
        paddingTop: '2%',
        paddingBottom: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
        marginBottom: '2%',
        backgroundColor: '#e5eaeb',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 4,
        borderColor: "white",
    },
    buttonContainer: {
        height: '6%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 40,
        backgroundColor: "#2e548c",
    }
});

const stylesLandscape = StyleSheet.create({
    input: {
        fontSize: 12,
        color: '#000000',
        height: '45%',
        alignSelf: 'stretch',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderColor: '#5b5b5b',
        borderBottomWidth: 1
    },
    title_section:{
        fontSize:12,
        color: "#696969",
        marginTop:'3%',
    },
    container: {
        flex: 1,
        backgroundColor: '#e5eaeb',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
        position: 'absolute',
    },
    name:{
        fontSize:12,
        color:"#696969",
    },
    body:{
        backgroundColor: '#e5eaeb',
        marginTop: "1%",
        alignItems: 'center',
        padding: '1%',
        //flex: 1,
        borderColor: '#bbc0c1',
        borderWidth: 0.2,
    },
    infoBox:{
        flex: 0.7,
        backgroundColor:'white',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '3%',
        justifyContent: 'center',
        width: '70%',
        height: '70%',
        borderRadius: 40,
        borderColor: '#bbc0c1',
        borderWidth: 0.2,
    },
    infoContainer: {
        width: '90%',
        height: '12%',
        borderColor: '#2e548c',
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        marginBottom: '3%',
        flexDirection: 'row',
        alignItems:'center',
    },
    infoContainerNames: {
        width: '70%',
        height: '9%',
        borderColor: '#2e548c',
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        marginBottom: '0.5%',
        marginLeft: '6%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    infoIcon:{
        width: '10%',
        height: '40%',
        marginLeft: '3%',
        marginRight: '3%',
    },
    putEditIcon: {
        paddingTop: '12%',
        paddingLeft: '12%',
        alignItems: 'center'
    },
    infoIconEditPhoto: {
        paddingTop: '1.5%',
        paddingBottom: '1%',
        paddingLeft: '1.5%',
        paddingRight: '1.5%',
        backgroundColor: '#e5eaeb',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 4,
        borderColor: "white",
    },
    buttonContainer: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        borderRadius: 40,
        backgroundColor: "#2e548c",
    }
});