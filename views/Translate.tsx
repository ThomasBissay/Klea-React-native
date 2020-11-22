import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import HeaderKlea from '../component/HeaderKlea';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
});

function TranslateScreen(props: any): JSX.Element {
  return (
    <View style={styles.mainContainer}>
      <HeaderKlea
        title="Traduction"
        handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        leftIconName="menu"
        rightIconName="none"
        handleRightClick={() => ''}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Traduction Screen</Text>
      </View>
    </View>
  );
}

export default TranslateScreen;
