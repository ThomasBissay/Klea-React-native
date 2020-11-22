import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from "react-native";
import MapView, { LatLng, Region } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {DrawerNavigationProp} from "@react-navigation/drawer";

import { AppNavigatorParamList } from '../utils/NavigationTypes';
import HeaderKlea from "../component/HeaderKlea";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '100%',
    },
});

type MapScreenNavigationProp = DrawerNavigationProp<
    AppNavigatorParamList,
    'Map'
    >;

type PropsProfil = {
    navigation: MapScreenNavigationProp;
};

export default function MapScreen({ navigation }: PropsProfil): JSX.Element {
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [currentPos, setCurrentPos] = useState<LatLng>({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            setCurrentPos({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        })();
    }, []);

    function onRegionChange(region: Region) {
        setRegion( region );
    }

    return (
        <View style={{flex: 1}}>
            <HeaderKlea
                title="Ma carte"
                handleMenu={() => navigation.openDrawer()}
                leftIconName="menu"
                rightIconName="none"
                handleRightClick={() => ''}
            />
            <View style={styles.container}>
                <MapView
                    region={region}
                    onRegionChange={onRegionChange}
                    style={styles.mapStyle}
                >
                    <Marker
                        coordinate={currentPos}
                        title="Postion actuelle"
                        description="Vous vous situez ici."
                    />
                </MapView>
            </View>
        </View>
    )
}