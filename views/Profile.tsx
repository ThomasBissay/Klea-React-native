import {StackNavigationProp, createStackNavigator} from "@react-navigation/stack";
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {DrawerActions} from "@react-navigation/native";
import HeaderKlea from "../component/HeaderKlea";
import EditProfil from "./EditProfil";
//import { connect } from 'react-redux';

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
    Profile: undefined;
    EditProfil: undefined;
};

type DrawerNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Profile'
    >;

type Props = {
    navigation: DrawerNavigationProp;
};

function ProfileScreen({navigation}: Props) {

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');
    const [firstName, setFirstName] = useState('Thomas');
    const [lastName, setLastName] = useState('Bissay');
    const [email, setEmail] = useState('thomas.bissay@epitech.eu');
    const [gender, setGender] = useState('Homme');
    const [address, setAddress] = useState('10 rue Auguste, Deauville');
    const [phoneNumber, setPhoneNumber] = useState('0600000000');
    const [bio, setBio] = useState('Amateur de photographie');
    const [imageProfil, setUriPhoto] = useState('');

    Dimensions.addEventListener('change', () => {
        setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    const _goEdit = () => {
        navigation.navigate('EditProfil');
        console.log('Test');
    }

    const getStyle = () => {
        if (orientation === 'landscape') {
            return stylesLandscape;
        } else {
            return stylesPortrait;
        }
    }

    const _profile = () => {
        return ( <View style={getStyle().container}>
            <HeaderKlea title={"Profil"} handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        rightIconName={"edit"} handleRightClick={() => navigation.navigate("EditProfil")}/>
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 300}}>
                <View style={getStyle().body}>
                    <Image source={imageProfil !== "" ? {uri: imageProfil} : require("../assets/example.png")} style={getStyle().avatar}/>
                    <Text style={getStyle().name}>{lastName} {firstName}</Text>
                    <View style={getStyle().infoBox}>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-sharp/24/000000/important-mail.png'}}
                                   resizeMode="contain"/>
                            <Text style={getStyle().info}>{email}</Text>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-sharp/24/000000/gender.png'}}
                                   resizeMode="contain"/>
                            <Text style={getStyle().info}>{gender}</Text>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/material-rounded/24/000000/home.png'}}
                                   resizeMode="contain"/>
                            <Text style={getStyle().info}>{address}</Text>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/android/24/000000/phone.png'}}
                                   resizeMode="contain"/>
                            <Text style={getStyle().info}>{phoneNumber}</Text>
                        </View>
                        <View style={getStyle().infoContainer}>
                            <Image style={getStyle().infoIcon}
                                   source={{uri: 'https://img.icons8.com/metro/26/000000/info.png'}}
                                   resizeMode="contain"/>
                            <Text style={getStyle().info}>{bio}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>)
    }

    const _editProfile = () => {
        return (<EditProfil/>)
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={_profile} />
            <Stack.Screen name="EditProfil" component={_editProfile} />
        </Stack.Navigator>);
}

// Configuration et connexion au store (Redux)
/*const mapStateToProps = (state) => {
    return {
        font: state.font,
        color: state.color,
        token: state.token,
    }
};

export default connect(mapStateToProps)(Profil);
*/

const stylesPortrait = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign:'center',
        margin: '4%',
        borderColor: '#ffffff',
        borderRadius:8,
    },
    toolbarButton:{
        color:'white',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#e5eaeb',
    },
    header:{
        paddingTop: '3%',
        backgroundColor: "#2e548c",
        height: '19%',
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
        marginTop: '3%',
        marginBottom: '10%'
    },
    body:{
        backgroundColor: '#e5eaeb',
        alignItems: 'center',
        padding: '5%',
        flex: 1,
    },
    infoBox:{
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '95%',
        marginBottom: '5%',
        borderRadius: 40,
    },
    infoContainer: {
        width: '85%',
        height: '17%',
        borderColor: '#2e548c',
        borderRadius: 40,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems:'center',
    },
    infoIcon:{
        alignSelf: 'center',
        width: '10%',
        height: '30%',
        marginLeft: '4%',
    },
    info: {
        height: '30%',
        marginLeft:'6%',
    },
});

const stylesLandscape = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign:'center',
        margin: '1%',
        borderColor: '#ffffff',
        borderRadius:8,
        borderWidth: 1,
    },
    toolbarButton:{
        color:'white',
        alignItems: 'center'
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
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
        marginTop: '16%',
        marginBottom: '1%'
    },
    body:{
        backgroundColor: '#e5eaeb',
        marginTop: "1%",
        alignItems: 'center',
        borderColor: '#bbc0c1',
        borderWidth: 0.2,
    },
    infoBox:{
        backgroundColor:'white',
        alignItems: 'center',
        marginBottom: '3%',
        justifyContent: 'center',
        width: '70%',
        height: '60%',
        borderRadius: 40,
    },
    infoContainer: {
        width: '85%',
        height: '15%',
        borderColor: '#2e548c',
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        marginBottom: '0.5%',
        flexDirection: 'row',
        alignItems:'center',
    },
    infoIcon:{
        width: '10%',
        height: '45%',
        marginLeft: '4%',
    },
    info: {
        height: '40%',
        marginLeft:'5%',
    },
});

export default ProfileScreen;