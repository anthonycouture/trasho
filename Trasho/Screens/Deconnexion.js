import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Globals from '../Globals';

export default class Deconnexion extends Component {

    state = {
        dialogVisible: true
    }

    async _deconnexion() {
        await AsyncStorage.clear();
        Globals.admin = false
        Globals.connected = false
        this.props.navigation.navigate('Connexion');
    };

    cacherDialog() {
        this.setState({ dialogVisible: false });
    }

    render() {
        return (
            <ConfirmDialog
                title="Confirmation"
                message="Voulez-vous vraiment vous déconnecter ?"
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({ dialogVisible: false })}
                positiveButton={{
                    title: "Oui",
                    onPress: () => {this._deconnexion(), this.cacherDialog()}
                }}
                negativeButton={{
                    title: "Non",
                    onPress: () => {this.props.navigation.navigate('Map'), this.cacherDialog()}
                }}
            />
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