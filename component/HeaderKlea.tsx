import React from 'react';
import {
  Header,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

interface Props{
  title: string;
  handleMenu: () => void;
  leftIconName: string;
  rightIconName: string;
  handleRightClick: () => void;
}

function HeaderKlea({
  title, handleMenu, leftIconName, rightIconName, handleRightClick,
}: Props): JSX.Element {
  const displayLeft = () => {
    if (leftIconName === 'none') { return (<Icon name="menu" color="white" onPress={() => handleMenu()} />); }
    return (<Icon name={leftIconName} color="white" onPress={() => handleMenu()} />);
  };

  const displayRight = () => {
    if (rightIconName === 'none') {
      return (
        <View />
      );
    }

    return (
      <Button transparent>
        <Icon name={rightIconName} color="white" onPress={() => handleRightClick()} />
      </Button>
    );
  };

  return (
    <Header style={{ backgroundColor: '#5d9683', height: 50 }}>
      <Left style={{ flex: 1 }}>
        <Button transparent>
          {displayLeft()}
        </Button>
      </Left>
      <Body style={{ flex: 2 }}>
        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 19 }}>{title}</Text>
      </Body>
      <Right style={{ flex: 1 }}>
        {displayRight()}
      </Right>
    </Header>
  );
}

export default HeaderKlea;
