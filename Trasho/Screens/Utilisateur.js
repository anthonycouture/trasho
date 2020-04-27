import React, { Component } from 'react';
import { StyleSheet, View, Image, Switch } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Text, Button, Icon } from 'native-base';
import * as Progress from 'react-native-progress';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import GLOBAL from '../Globals';

export default class Utilisateur extends Component {
    state = { switchValue: false, dialogVisible: false, email: '', admin: false }

    async componentDidMount() {
        //console.log(useNavigationParam('email'));

        //console.log(this.props.navigation.state.params.mail);
        console.log("Parametre mail : " + this.props.navigation.getParam("mail"));
        console.log("Parametre admin : " + this.props.navigation.getParam("admin"));
        this.setState({
            email: this.props.navigation.getParam("mail"),
            admin: this.props.navigation.getParam("admin"),
            switchValue: this.props.navigation.getParam("admin")
        });
    }

    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value })
        //state changes according to switch
        //which will result in re-render the text
    }
    changeDialogState() {
        this.setState(prevState => ({
            dialogVisible: !prevState.dialogVisible
        }));
    }

    componentDidUpdate(prevProps) {
        // Utilisation classique (pensez bien à comparer les props) :
        if (this.props.navigation.getParam("mail") != this.state.email) {
            //this.fetchData(this.props.userID);
            console.log('ca a changé !');
            this.setState({
                email: this.props.navigation.getParam("mail"),
                admin: this.props.navigation.getParam("admin"),
                switchValue: this.props.navigation.getParam("admin")
            });
        }
    }

    saveModifications() {
        alert('clic');
        const url = GLOBAL.BASE_URL + '/api/user/update';
        const body = 'mail=' + this.state.email + '&admin=' + this.state.switchValue;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            }),
            body: body // <-- Post parameters
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
        console.log("Parametre1 : " + this.props.navigation.getParam("mail"));
        return (
            <Container>
                <Content>
                    <Image
                        source={require('../Images/logo.png')}
                        style={styles.logo}
                    />

                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 25, fontSize: 30 }}>Email</Text>

                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 15 }}>{this.props.navigation.getParam("mail")}</Text>

                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 25, fontSize: 30 }}>Admin</Text>
                    <Switch
                        style={{ marginTop: 15, marginLeft: 'auto', marginRight: 'auto' }}
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue}
                    />

                    <Text style={styles.niveau}> Niveau </Text>
                    <Item style={{ borderColor: 'transparent', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5 }}>1</Text>
                        <Progress.Bar progress={0.5} width={300} borderColor={'#74992e'} color={'#74992e'} />
                        <Text style={{ marginLeft: 5 }}>2</Text>
                    </Item>

                    <Button rounded block style={[styles.submitButton, styles.buttonWidth]}
                        onPress={
                            () => this.saveModifications()
                        }>
                        <Text style={styles.submitButtonText}> Sauvegarder modifications </Text>
                    </Button>

                    <Button rounded block style={[styles.deconnexion, styles.buttonWidth]}
                        onPress={
                            () => this.changeDialogState()
                        }>
                        <Text style={styles.submitButtonText}> Supprimer le compte </Text>
                    </Button>
                    <ConfirmDialog
                        title="Confirmation"
                        message="Voulez-vous vraiment supprimer le compte ?"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({ dialogVisible: false })}
                        positiveButton={{
                            title: "Oui",
                            onPress: () => { this.changeDialogState() }
                        }}
                        negativeButton={{
                            title: "Non",
                            onPress: () => { this.changeDialogState() }
                        }}
                    />


                </Content>

            </Container >
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
    logo: {
        width: 250,
        height: 250,
        marginLeft: 10,
        marginTop: 3,
        marginLeft: 'auto',
        marginRight: 'auto'
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
    },
    submitButton: {
        backgroundColor: '#74992e',
        padding: 10,
        marginTop: 40,
        height: 40,
        marginBottom: 30
    }
});