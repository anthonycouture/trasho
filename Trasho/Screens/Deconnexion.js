import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';

export default class Deconnexion extends Component {
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> Déconnexion </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
});