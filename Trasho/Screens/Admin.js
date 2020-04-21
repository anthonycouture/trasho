//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
// import all basic components

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