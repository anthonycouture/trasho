import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon, Toast } from "native-base";
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
        showOldPassword: false,
        oldPassword: '',
        password: '',
        confirmPassword: '',
        iconOldPassword: "eye-off",
        iconPassword: "eye-off",
        iconConfirmPassword: "eye-off",
        dialogVisible: false,
        dialogSuppressionVisible: false,
        user: null,
        loading: false,
    }

    /**
     * When the page will appear for first time, this function was called
     */
    componentDidMount() {        
        this.getUserInfo();
        this.props.navigation.addListener('willFocus', payload => {
            this.getUserInfo();
        });
    }

    /**
     * Get user information
     */
    async getUserInfo(){
        const url = GLOBAL.BASE_URL + '/api/user/email/' + GLOBAL.email;      
        await fetch(url, {
            method: 'GET',
            headers: {
                "token_api": GLOBAL.token_api
            }
        }).then(async (response) => {            
            if(response.status != 200){
                Toast.show({
                    text: "Problème de communication avec l'API",
                    duration : 3000,
                    buttonText: "Okay !",
                    type: "danger"
                });
                return;
            }
            await response.json().then((json) => {
                this.setState({ 
                    user: Object.values(json.utilisateur)[0],
                    loading: true
                });
            })
        })
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

    changeDialogSuppressionState() {
        this.setState(prevState => ({
            dialogSuppressionVisible: !prevState.dialogSuppressionVisible
        }));
    }

    _changeIconOldPassword() {
        this.setState(prevState => ({
            iconOldPassword: prevState.iconOldPassword === 'eye' ? 'eye-off' : 'eye',
            showOldPassword: !prevState.showOldPassword
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

    handleOldPassword = (text) => {
        this.setState({ oldPassword: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
    }

    _checkPassword() {
        var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,50}$/;
        if (this.state.password.length < 6) {
            return false;
        } else if (this.state.password.length > 50) {
            return false;
        }
        else if (!regexPassword.test(this.state.password)) {
            return false;
        }
        return true;
    }

    checkChangePassword() {
        if (this.state.oldPassword && this.state.password && this.state.confirmPassword) {
            if (this.state.password == this.state.oldPassword) {
                Toast.show({
                    text: "Le nouveau mot de passe ne peut être le même que l'ancien",
                    duration : 3000,
                    buttonText: "Okay !",
                    type: "danger"
                });
            }
            else if (this.state.password != this.state.confirmPassword) {
                Toast.show({
                    text: "La confirmation du mot de passe est incorrecte",
                    duration : 3000,
                    buttonText: "Okay !",
                    type: "danger"
                });
            }
            else if (!this._checkPassword()) {
                Toast.show({
                    text: "Le mot de passe doit faire entre 6 et 50 caractères et contenir au moins une minuscule, une majuscule et un chiffre",
                    duration : 3000,
                    buttonText: "Okay !",
                    type: "danger"
                });
            }
            else {
                this.changePassword();
            }
        }
        else {
            Toast.show({
                text: "Veuillez remplir les champs",
                duration : 3000,
                buttonText: "Okay !",
                type: "danger"
            });
        }
    }

    changePassword() {
        const url = GLOBAL.BASE_URL + '/api/user/updatePassword';
        const body = 'mail=' + Globals.email + '&oldPassword=' + this.state.oldPassword + '&newPassword=' + this.state.password;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                "token_api": GLOBAL.token_api,
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: body
        })
            .then((response) => {
                response.text();
                console.log(response.status);
                if (response.status == 400) {
                    alert("Problème sur l'ancien mot de passe");
                }
                else if (response.status == 201) {
                    alert('Changement de mot de passe réussi !');
                }
            })
            .then((responseText) => { })
            .catch((error) => {
                console.error(error);
            });
    }

    deleteUser(mail) {
        const url = GLOBAL.BASE_URL + '/api/user/delete';
        const body = 'mail=' + mail;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                "token_api": GLOBAL.token_api,
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: body
        })
            .then((response) => response.text())
            .then((responseText) => {
                alert("Compte supprimé !");
                this._deconnexion();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async retrieveUserData(){
        Toast.show({
            text: "Veuillez patienter s'il vous plaît",
            duration : 3000,
            buttonText: "Okay !"
        });
        const url = GLOBAL.BASE_URL + '/api/user/retrieve/' + Globals.email;
        fetch(url, {
            method: 'GET',
            headers: {
                "token_api": Globals.token_api
            }
        }).then(async (response) => {            
            if(response.status == 200){
                Toast.show({
                    text: "Un mail vous a été envoyé !",
                    duration : 5000,
                    buttonText: "Okay !",
                    type: "success"
                });
            } else {
                Toast.show({
                    text: "Un problème est survenu.",
                    duration : 5000,
                    buttonText: "Okay !",
                    type: "danger"
                });
            }
        })
    }

    render() {
        if(!this.state.loading){
            return(
                <View><Text>Please wait..</Text></View>
            )
        }
        return (
            <Container>
                <Content padder style={{ flex: 1 }}>
                    <Text style={styles.niveau}> Niveau </Text>
                    <Item style={{ borderColor: 'transparent', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5 }}>{this.state.user.niveau}</Text>
                        <Progress.Bar progress={this.state.user.experience/100} width={300} borderColor={'#74992e'} color={'#74992e'} />
                        <Text style={{ marginLeft: 5 }}>{this.state.user.niveau+1}</Text>
                    </Item>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black', borderColor: 'black' }}>
                            <Text>Modifier mot de passe</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Item>
                                    <Input placeholder="Ancien mot de passe" secureTextEntry={!this.state.showOldPassword} onChangeText={this.handleOldPassword} />
                                    <Icon name={this.state.iconOldPassword} onPress={() => this._changeIconOldPassword()} />
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
                                        () => this.checkChangePassword()
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
                                    () => this.retrieveUserData()
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
                                    () => this.changeDialogSuppressionState()
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
                            onPress: () => { this.props.navigation.navigate('MapPage'), this.changeDialogState() }
                        }}
                    />
                    <ConfirmDialog
                        title="Confirmation"
                        message="Voulez-vous vraiment supprimer le compte ?"
                        visible={this.state.dialogSuppressionVisible}
                        onTouchOutside={() => this.setState({ dialogSuppressionVisible: false })}
                        positiveButton={{
                            title: "Oui",
                            onPress: () => { this.deleteUser(Globals.email), this.changeDialogSuppressionState() }
                        }}
                        negativeButton={{
                            title: "Non",
                            onPress: () => { this.changeDialogSuppressionState() }
                        }}
                    />
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
    }
});