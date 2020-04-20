import React, { Component } from 'react';

import { StyleSheet, Platform, View, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { Text, Icon, Item } from 'native-base';

import { DrawerNavigator } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import Map from '../Screens/Map';
import Connexion from '../Screens/Connexion';
import Itineraire from '../Screens/Itineraire';
import Admin from '../Screens/Admin';
import MonCompte from '../Screens/MonCompte';

export default class CustomSideMenu extends Component {

    render() {

        return (

            <View style={styles.sideMenuContainer}>

                <Image source={require('../Images/logo.png')} style={{ height: 140, width: 140, marginTop: 50 }} />

                <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />

                <View style={{ width: '100%' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>


                        <Icon name='md-log-in' style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Connexion') }} > Connexion </Text>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                        <Icon name='map' style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Map') }} > Map </Text>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                        <Icon name='md-locate' style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Itineraire') }} > Itineraire </Text>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                        <Icon name='md-person' style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('MonCompte') }} > Mon compte </Text>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                        <Icon name='md-settings' style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Admin') }} > Admin </Text>

                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',

    },

    sideMenuContainer: {

        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20
    },

    sideMenuProfileIcon:
        {
            resizeMode: 'center',
            width: 150,
            height: 150,
            borderRadius: 150 / 2
        },

    sideMenuIcon:
        {
            resizeMode: 'center',
            width: 28,
            height: 28,
            marginRight: 10,
            marginLeft: 20

        },

    menuText: {

        fontSize: 18,
        color: '#000000',

    }

});