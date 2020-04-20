import React, { Component } from 'react';

import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';

import { DrawerNavigator } from 'react-navigation';

import { StackNavigator } from 'react-navigation';

import Connexion from '../Screens/Connexion';

export default class CustomSideMenu extends Component {

    render() {

        return (

            <View style={styles.sideMenuContainer}>

                <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg' }}
                    style={styles.sideMenuProfileIcon} />

                <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />

                <View style={{ width: '100%' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                        <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/08/social.jpg' }}
                            style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Connexion') }} > First Activity </Text>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                        <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/08/promotions.jpg' }}
                            style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Second') }} > Second Activity </Text>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                        <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/08/outbox.jpg' }}
                            style={styles.sideMenuIcon} />

                        <Text style={styles.menuText} onPress={() => { this.props.navigation.navigate('Third') }} > Third Activity </Text>

                    </View>


                </View>

                <View style={{ width: '100%', height: 1, backgroundColor: '#e2e2e2', marginTop: 15 }} />


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

        fontSize: 15,
        color: '#222222',

    }

});