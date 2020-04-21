import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';

export default class Admin extends Component {

    async componentDidMount() {
        console.log("componentDidMount");
        await AsyncStorage.clear();
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 23 }}> Admin </Text>
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