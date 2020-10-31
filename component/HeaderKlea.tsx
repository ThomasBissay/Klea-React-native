import React from 'react';
import {
    Header,
    Left,
    Button,
    Body,
    Title,
    Right
} from 'native-base';
import {View} from "react-native";
import {Icon} from "react-native-elements";

interface Props{
    title: string;
    handleMenu: () => void;
}

function onDisplayRight() {
        return (
            <View/>
        )
}

function HeaderKlea ({title, handleMenu}: Props) {
    return (
        <Header style={{ backgroundColor: "#335382", height: 50}}>
            <Left style={{flex: 1}}>
                <Button transparent>
                    <Icon name={"menu"} color="white" onPress={() => handleMenu()}/>
                </Button>
            </Left>
            <Body style={{flex: 2}}>
                <Title style={{ alignSelf: "center"}}>{title}</Title>
            </Body>
            <Right style={{flex: 1}}>
                {onDisplayRight() }
            </Right>
        </Header>
    );
}

export default HeaderKlea;