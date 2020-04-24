import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';

export default class AjouterPoubelle extends Component {

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> Ajouter poubelle </Text>
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