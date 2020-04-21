import React, { Component } from 'react';

import { StyleSheet, Platform, Image, TouchableOpacity, YellowBox, Dimensions, View } from 'react-native';
import { Text, Icon, Item } from 'native-base';

import { DrawerNavigator } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import Map from '../Screens/Map';
import Connexion from '../Screens/Connexion';
import Itineraire from '../Screens/Itineraire';
import Admin from '../Screens/Admin';
import MonCompte from '../Screens/MonCompte';
import CustomView from './CustomView';

export default class CustomSideMenu extends Component {

    state = {
        currentPage: '',
        isConnexionHidden: true,
        isAdminHidden: true,
        isMonCompteHidden: true
    }

    getStylePage(page) {
        if (this.state.currentPage == page) {
            return {
                color: '#74992e'
            }
        } else {
            return {
                color: 'black'
            }
        }
    }

    getBackground(page) {
        if (this.state.currentPage == page) {
            return {
                backgroundColor: '#dcdcdc'
            }
        } else {
            return {
                backgroundColor: 'white'
            }
        }
    }

    render() {

        return (

            <View style={styles.sideMenuContainer}>

                <Image source={require('../Images/logo.png')} style={{ height: 140, width: 140, marginTop: 50 }} />

                <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />

                <View style={{ width: '100%' }}>

                    {!this.state.isConnexionHidden && <View style={[styles.onglet, this.getBackground('Connexion')]} hide={this.state.isConnexionHidden}>

                        <Icon name='md-log-in' style={[styles.sideMenuIcon, this.getStylePage('Connexion')]} />

                        <Text style={[styles.menuText, this.getStylePage('Connexion')]} onPress={() => { this.props.navigation.navigate('Connexion'), this.setState({ currentPage: 'Connexion' }); }} > Connexion </Text>

                    </View>
                    }

                    <View style={[styles.onglet, this.getBackground('Map')]}>

                        <Icon name='map' style={[styles.sideMenuIcon, this.getStylePage('Map')]} />

                        <Text style={[styles.menuText, this.getStylePage('Map')]} onPress={() => { this.props.navigation.navigate('Map'), this.setState({ currentPage: 'Map' }); }} > Map </Text>

                    </View>

                    <View style={[styles.onglet, this.getBackground('Itineraire')]}>

                        <Icon name='md-locate' style={[styles.sideMenuIcon, this.getStylePage('Itineraire')]} />

                        <Text style={[styles.menuText, this.getStylePage('Itineraire')]} onPress={() => { this.props.navigation.navigate('Itineraire'), this.setState({ currentPage: 'Itineraire' }); }} > Itineraire </Text>

                    </View>

                    {!this.state.isMonCompteHidden && <View style={[styles.onglet, this.getBackground('MonCompte')]} hide={this.state.isMonCompteHidden}>

                        <Icon name='md-person' style={[styles.sideMenuIcon, this.getStylePage('MonCompte')]} />

                        <Text style={[styles.menuText, this.getStylePage('MonCompte')]} onPress={() => { this.props.navigation.navigate('MonCompte'), this.setState({ currentPage: 'MonCompte' }); }} > Mon compte </Text>

                    </View>
                    }

                    {!this.state.isAdminHidden && <View style={[styles.onglet, this.getBackground('Admin')]}>

                        <Icon name='md-settings' style={[styles.sideMenuIcon, this.getStylePage('Admin')]} />

                        <Text style={[styles.menuText, this.getStylePage('Admin')]} onPress={() => { this.props.navigation.navigate('Admin'), this.setState({ currentPage: 'Admin' }); }} > Admin </Text>

                    </View>}




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
            width: 150,
            height: 150,
            borderRadius: 150 / 2
        },

    sideMenuIcon:
        {
            width: 28,
            height: 28,
            marginRight: 10,
            marginLeft: 20

        },

    menuText: {

        fontSize: 18,
        color: '#000000',

    },

    onglet: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15
    }

});