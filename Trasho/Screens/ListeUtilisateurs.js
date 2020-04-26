import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button, Icon } from 'native-base';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import GLOBAL from '../Globals';

export default class ListeUtilisateurs extends Component {

    constructor(props) {
        //constructor to set default state
        super(props);
      }

    state = {
        dialogVisible: false,
        listeUtilisateurs: []
    }

    async componentDidMount() {
        this.getAllUsers();
    }

    changeDialogState() {
        this.setState(prevState => ({
            dialogVisible: !prevState.dialogVisible
        }));
    }


    async getAllUsers() {
        const url = GLOBAL.BASE_URL + '/api/user/users';
        const response = await fetch(url).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        const res = await response.json();
        if (response.status == 400) {
            alert('Problème de récupération des données');
        }
        else if (response.status == 200) {
            console.log(res);

            const utilisateurs = []
            let utilisateur = res.utilisateur;

            for (let key in utilisateur) {
                utilisateurs.push(utilisateur[key].mail
                )
                console.log(key);
            }
            //this.state.listeUtilisateurs = utilisateurs;
            this.setState({ listeUtilisateurs: utilisateurs });
            console.log(utilisateurs[0]);
        }
    }

    navigatePageUser(email) {
        console.log("emmmmmmmmmmmmmmmmmmmmmmail : " + email);
        this.props.navigation.navigate('Utilisateur', {mail: email});
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.state.listeUtilisateurs.map((item, key) => (
                            <ListItem key={key}>
                                <Button transparent
                                    onPress={
                                        () => this.navigatePageUser(item)
                                    }>
                                    <Icon name={'person'} style={styles.black} />
                                    <Text style={styles.black}>{item}</Text>
                                </Button>
                            </ListItem>
                        ))}

                    </List>
                    <ConfirmDialog
                        title="Confirmation"
                        message="Voulez-vous vraiment vous déconnecter ?"
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
    black: {
        color: 'black'
    }
});