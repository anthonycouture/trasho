import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
import * as Progress from 'react-native-progress';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Globals from '../Globals';
import GLOBAL from '../Globals';

const dataArray = [
    { title: "Changer mot de passe", content: <Input placeholder="Mot de passe" /> },
];

export default class MonCompte extends Component {

    state = {
        showPassword: false,
        showConfirmPassword: false,
        password: '',
        confirmPassword: '',
        iconPassword: "eye-off",
        iconConfirmPassword: "eye-off",
        dialogVisible: false
    }

    async _deconnexion() {
        await AsyncStorage.clear();
        Globals.admin = false
        Globals.connected = false
        this.props.navigation.navigate('Connexion');
    };

    changeDialogState() {
        this.setState(prevState => ({
            dialogVisible: !prevState.dialogVisible
        }));
    }

    _changeIconPassword() {
        this.setState(prevState => ({
            iconPassword: prevState.iconPassword === 'eye' ? 'eye-off' : 'eye',
            showPassword: !prevState.showPassword
        }));
    }

    _changeIconConfirmPassword() {
        this.setState(prevState => ({
            iconConfirmPassword: prevState.iconConfirmPassword === 'eye' ? 'eye-off' : 'eye',
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
    }

    changePassword() {
        const url = GLOBAL.BASE_URL + '/api/user/updatePassword';
        console.log("email : " + Globals.email);
        console.log("oldPassword : " + this.state.password);
        console.log("newPassword : " + this.state.conformPassword);
        const body = 'mail=' + this.state.email + '&oldPassword=' + this.state.password + '&newPassword=' + this.state.confirmPassword;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: body
        })
            .then((response) => response.text())
            .then((responseText) => {
                /*if (response.status == 400) {
                    alert("Problème sur l'ancien mot de passe");
                }
                else if (response.status == 201) {
                    alert('Changement de mot de passe réussi !');

                }*/
                console.log(responseText);
            })
            .catch((error) => {
                console.error(error);
            });
            








    }

    saveModifications() {
        const url = GLOBAL.BASE_URL + '/api/user/update';
        const body = 'mail=' + this.state.email + '&admin=' + this.state.switchValue;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: body
        })
            .then((response) => response.text())
            .then((responseText) => {
                alert("Modifications sauvegardées !");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black', borderColor: 'black' }}>
                            <Text>Modifier mot de passe</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Item>
                                    <Input placeholder="Ancien mot de passe" />
                                </Item>
                                <Item>
                                    <Input placeholder="Nouveau mot de passe" secureTextEntry={!this.state.showPassword} onChangeText={this.handlePassword} />
                                    <Icon name={this.state.iconPassword} onPress={() => this._changeIconPassword()} />
                                </Item>
                                <Item>
                                    <Input placeholder="Confirmer nouveau mot de passe" secureTextEntry={!this.state.showConfirmPassword} onChangeText={this.handleConfirmPassword} />
                                    <Icon name={this.state.iconConfirmPassword} onPress={() => this._changeIconConfirmPassword()} />
                                </Item>
                                <Button rounded block style={[styles.submitButton, styles.buttonWidth]}
                                    onPress={
                                        () => this.changePassword()
                                    }>
                                    <Text style={styles.submitButtonText}> Valider </Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                            <Button transparent
                                onPress={
                                    () => alert('Récupération des données')
                                }>
                                <Icon name={'settings'} style={styles.black} />
                                <Text style={styles.black}>Récupérer mes données</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                            <Button transparent
                                onPress={
                                    () => alert('Suppression du compte')
                                }>
                                <Icon name={'person'} style={styles.black} />
                                <Text style={styles.black}>Supprimer mon compte</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Button rounded block style={[styles.deconnexion, styles.buttonWidth]}
                        onPress={
                            () => this.changeDialogState()
                        }>
                        <Text style={styles.submitButtonText}> Déconnexion </Text>
                    </Button>
                    <ConfirmDialog
                        title="Confirmation"
                        message="Voulez-vous vraiment vous déconnecter ?"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({ dialogVisible: false })}
                        positiveButton={{
                            title: "Oui",
                            onPress: () => { this._deconnexion(), this.changeDialogState() }
                        }}
                        negativeButton={{
                            title: "Non",
                            onPress: () => { this.props.navigation.navigate('Map'), this.changeDialogState() }
                        }}
                    />
                    <Text style={styles.niveau}> Niveau </Text>
                    <Item style={{ borderColor: 'transparent', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5 }}>1</Text>
                        <Progress.Bar progress={0.5} width={300} borderColor={'#74992e'} color={'#74992e'} />
                        <Text style={{ marginLeft: 5 }}>2</Text>
                    </Item>
                </Content>
            </Container>
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
    submitButton: {
        backgroundColor: '#74992e',
        padding: 10,
        marginTop: 40,
        height: 40,
        marginBottom: 30
    },
    deconnexion: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 40,
        height: 40,
        marginBottom: 30
    },
    buttonWidth: {
        marginLeft: 15,
        marginRight: 15
    },
    black: {
        color: 'black'
    },
    niveau: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 30
    }
});