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
    leftIconName: string;
    rightIconName: string;
    handleRightClick: () => void;
}

function HeaderKlea ({title, handleMenu, leftIconName, rightIconName, handleRightClick}: Props) {

    const _displayLeft = () => {
        if (leftIconName == "none")
            return (<Icon name={"menu"} color="white" onPress={() => handleMenu()}/>)
        else
            return (<Icon name={leftIconName} color="white" onPress={() => handleMenu()}/>)
    }

    const _displayRight = () => {
        if (rightIconName == "none")
            return (
                <View/>
            )
        else {
            return (
                <Button transparent>
                    <Icon name={rightIconName} color="white" onPress={() => handleRightClick()}/>
                </Button>)
        }
    }

    return (
        <Header style={{ backgroundColor: "#335382", height: 50}}>
            <Left style={{flex: 1}}>
                <Button transparent>
                    {_displayLeft()}
                </Button>
            </Left>
            <Body style={{flex: 2}}>
                <Title style={{ alignSelf: "center"}}>{title}</Title>
            </Body>
            <Right style={{flex: 1}}>
                {_displayRight()}
            </Right>
        </Header>
    );
}

export default HeaderKlea;