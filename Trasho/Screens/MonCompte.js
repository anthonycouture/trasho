import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
import * as Progress from 'react-native-progress';

const dataArray = [
    { title: "Changer mot de passe", content: <Input placeholder="Mot de passe" /> },
];

export default class MonCompte extends Component {

    state = {
        showPassword: false,
        showConfirmPassword: false,
        password: '',
        confirmPassword: '',
        icon: "eye-off"
    }

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            showPassword: !prevState.showPassword
        }));
    }

    _changeIconConfirmPassword() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
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
                                    <Icon name={this.state.icon} onPress={() => this._changeIcon()} />
                                </Item>
                                <Item>
                                    <Input placeholder="Confirmer nouveau mot de passe" secureTextEntry={!this.state.showConfirmPassword} onChangeText={this.handleConfirmPassword} />
                                    <Icon name={this.state.icon} onPress={() => this._changeIconConfirmPassword()} />
                                </Item>
                                <Button rounded block style={[styles.submitButton, styles.buttonWidth]}
                                    onPress={
                                        () => alert('Validé ! Nouveau mdp : ' + this.state.password + ' mdp confirmé : ' + this.state.confirmPassword)
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