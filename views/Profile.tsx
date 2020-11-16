import React, { useState } from 'react';
import {
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
import {stylesPortrait, stylesLandscape} from "../styles/styles";

export default function ProfileScreen(props: any): JSX.Element {

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

    const data = useSelector((state: RootState) => state.profile);
    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');

    Dimensions.addEventListener('change', () => {
        setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    return ( <View style={getStyle().container}>
        <HeaderKlea title={"Profil"} handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                    leftIconName={"menu"} rightIconName={"edit"} handleRightClick={() => props.navigation.navigate("EditProfil")}/>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={getStyle().body}>
                <View style={{alignItems: 'center'}}>
                    <Image source={data.imageProfil !== "" ? {uri: data.imageProfil} : require("../assets/example.png")} style={getStyle().avatar}/>
                    <Text style={getStyle().name}>{data.firstName !== "" ? data.firstName + " " + data.lastName : "Anonyme"} </Text>
                </View>
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
