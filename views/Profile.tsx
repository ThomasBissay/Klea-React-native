import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import {DrawerActions} from "@react-navigation/native";
import HeaderKlea from "../component/HeaderKlea";
import { useSelector } from 'react-redux';
import { RootState} from "../redux/store";

export default function ProfileScreen(props: any): JSX.Element {

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const data = useSelector((state: RootState) => state.profile);
    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');

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

    return ( <View style={getStyle().container}>
        <HeaderKlea title={"Profil"} handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                    leftIconName={"menu"} rightIconName={"edit"} handleRightClick={() => props.navigation.navigate("EditProfil")}/>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 300}}>
            <View style={getStyle().body}>
                <Image source={data.imageProfil !== "" ? {uri: data.imageProfil} : require("../assets/example.png")} style={getStyle().avatar}/>
                <Text style={getStyle().name}>{data.firstName !== "" ? data.firstName + " " + data.lastName : "Anonyme"} </Text>
                <View style={getStyle().infoBox}>
                    <View style={getStyle().infoContainer}>
                        <Image style={getStyle().infoIcon}
                               source={{uri: 'https://img.icons8.com/material-sharp/24/000000/important-mail.png'}}
                               resizeMode="contain"/>
                        <Text style={getStyle().info}>{data.email !== "" ? data.email : "Non renseigné"}</Text>
                    </View>
                    <View style={getStyle().infoContainer}>
                        <Image style={getStyle().infoIcon}
                               source={{uri: 'https://img.icons8.com/material-sharp/24/000000/gender.png'}}
                               resizeMode="contain"/>
                        <Text style={getStyle().info}>{data.gender !== "" ? data.gender : "Non renseigné"}</Text>
                    </View>
                    <View style={getStyle().infoContainer}>
                        <Image style={getStyle().infoIcon}
                               source={{uri: 'https://img.icons8.com/material-rounded/24/000000/home.png'}}
                               resizeMode="contain"/>
                        <Text style={getStyle().info}>{data.address !== "" ? data.address : "Non renseigné"}</Text>
                    </View>
                    <View style={getStyle().infoContainer}>
                        <Image style={getStyle().infoIcon}
                               source={{uri: 'https://img.icons8.com/android/24/000000/phone.png'}}
                               resizeMode="contain"/>
                        <Text style={getStyle().info}>{data.phoneNumber !== "" ? data.phoneNumber : "Non renseigné"}</Text>
                    </View>
                    <View style={getStyle().infoContainer}>
                        <Image style={getStyle().infoIcon}
                               source={{uri: 'https://img.icons8.com/metro/26/000000/info.png'}}
                               resizeMode="contain"/>
                        <Text style={getStyle().info}>{data.bio !== "" ? data.bio : "Non renseigné"}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>)
}

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