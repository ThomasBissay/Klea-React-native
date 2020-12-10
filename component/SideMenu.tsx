import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  icon: {
    color: '#5d9783',
    fontSize: 100,
  },
  iconText: {
    color: '#5d9783',
    fontSize: 30,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#e4eaec',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e4eaec',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default function SideMenu({ navigation } : DrawerContentComponentProps): JSX.Element {
  return (
    <View style={{ flex: 1, backgroundColor: '#e4eaec' }}>
      <View style={{
        alignItems: 'center',
        backgroundColor: '#e4eaec',
        paddingVertical: 50,
      }}
      >
        <Icon name="globe" type="font-awesome" iconStyle={styles.icon} />
        <Text style={styles.iconText}>KLEA</Text>
      </View>
      <DrawerContentScrollView>
        <View style={styles.contentContainer}>
          <DrawerItem
            icon={() => (<Icon color="#41675a" type="font-awesome" name="sticky-note" />)}
            label="Mes Mémos"
            onPress={() => navigation.navigate('Mémos')}
          />
          <DrawerItem
            icon={() => (<Icon color="#41675a" type="font-awesome" name="user" />)}
            label="Mon Profil"
            onPress={() => navigation.navigate('Profil', {
              screen: 'ProfileScreen',
            })}
          />
          <DrawerItem
            icon={() => (<Icon color="#41675a" type="font-awesome" name="money" />)}
            label="Mon Budget"
            onPress={() => navigation.navigate('Budget')}
          />
          <DrawerItem
            icon={() => (<Icon color="#41675a" type="font-awesome" name="map" />)}
            label="Ma Carte"
            onPress={() => navigation.navigate('Map')}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footerContainer}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Logout')}>
            <Icon color="#d4473b" size={35} type="font-awesome" name="sign-out" />
            <Text style={{ marginLeft: 10, color: '#d4473b' }}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
