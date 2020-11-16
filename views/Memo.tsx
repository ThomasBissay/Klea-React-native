import { DrawerActions } from '@react-navigation/native';
import {Text, View, Button, ScrollView, Image, Dimensions, TouchableOpacity, TextInput} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {useSelector} from "react-redux";
import {stylesPortrait, stylesLandscape} from "../styles/styles";
import {RootState} from "../redux/store";
import {useState} from "react";

export default function MemoScreen(props: any): JSX.Element {

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

    //const data = useSelector((state: RootState) => state.memos);
    const [orientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');
    const [filters, setFilters] = useState({f1: true, f2: true, f3: true});

    Dimensions.addEventListener('change', () => {
        setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    const handleFilters = (target: string) => {
        console.log(filters.f1)
        switch (target) {
            case 'f1': {
                setFilters({...filters, f1: !filters.f1});
                break;
            }
            case 'f2': {
                setFilters({...filters, f2: !filters.f2});
                break;
            }
            case 'f3': {
                setFilters({...filters, f3: !filters.f3});
                break;
            }
        }
    }

    return ( <View style={getStyle().container}>
        <HeaderKlea title={"Mémos"} handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                    leftIconName={"menu"} rightIconName={"none"} handleRightClick={() => ""}/>
            <View style={getStyle().header}>
                <View style={getStyle().searchBar}>
                    <Image style={getStyle().infoIcon}
                           source={{uri: 'https://img.icons8.com/material-sharp/24/000000/search.png'}}
                           resizeMode="contain"/>
                    <TextInput style={getStyle().searchInput} placeholder="Rechercher par titre ..." maxLength={40}/>
                </View>
                <View style={getStyle().filtersBar}>
                    <TouchableOpacity style={[getStyle().filterButton, filters.f1 ? {backgroundColor: '#5c70c1'} : {backgroundColor: '#656566'}]}
                                      onPress={() => handleFilters("f1")}>
                        <Text style={getStyle().buttonText}>À faire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[getStyle().filterButton, filters.f2 ? {backgroundColor: '#c64e03'} : {backgroundColor: '#656566'}]}
                                      onPress={() => handleFilters("f2")}>
                        <Text style={getStyle().buttonText}>Prioritaire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[getStyle().filterButton, filters.f3 ? {backgroundColor: '#9e0000'} : {backgroundColor: '#656566'}]}
                                      onPress={() => handleFilters("f3")}>
                        <Text style={getStyle().buttonText}>Urgent</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={getStyle().body}>
                <View style={{height: '12%'}}>
                    <TouchableOpacity style={getStyle().memoButton}>
                        <Image style={getStyle().memoIcon}
                               source={{uri: 'https://img.icons8.com/material-sharp/24/000000/plus.png'}}
                               resizeMode="contain"/>
                        <Text style={{marginLeft: "25%"}}>Nouveau mémo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <TouchableOpacity style={getStyle().memoItem}>
                        <Text style={getStyle().memoTitle}>Title</Text>
                        <Text style={getStyle().memoText}>Test</Text>
                        <TouchableOpacity style={[getStyle().memoTag, {borderColor: '#9e0000'}]}><Text>Urgent</Text></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={getStyle().memoItem}>
                        <Text style={getStyle().memoTitle}>Title</Text>
                        <Text style={getStyle().memoText}>Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={getStyle().memoItem}>
                        <Text style={getStyle().memoTitle}>Title</Text>
                        <Text style={getStyle().memoText}>Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={getStyle().memoItem}>
                        <Text style={getStyle().memoTitle}>Title</Text>
                        <Text style={getStyle().memoText}>Test</Text>
                    </TouchableOpacity>
                </ScrollView>
                </View>
            </View>
    </View>)
}
