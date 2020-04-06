//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
import * as Progress from 'react-native-progress';
// import all basic components

const dataArray = [
    { title: "Changer mot de passe", content: <Input placeholder="Mot de passe" /> },
];

export default class MonCompte extends Component {
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
                                    <Input placeholder="Nouveau mot de passe" />
                                </Item>
                                <Item>
                                    <Input placeholder="Confirmer nouveau mot de passe" />
                                </Item>
                                <Button rounded block style={[styles.submitButton, styles.buttonWidth]}
                                    onPress={
                                        () => alert('Validé')
                                    }>
                                    <Text style={styles.submitButtonText}> Valider </Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                        <Icon name={'settings'} />
                            <Text>Récupérer mes données</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                            <Icon name={'person'} />
                            <Text>Supprimer mon compte</Text>
                        </CardItem>
                    </Card>
                    <Text style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 30 }}> Niveau </Text>
                    <Item style={{ borderColor: 'transparent', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{marginRight: 5}}>1</Text>
                        <Progress.Bar progress={0.5} width={300} borderColor={'#74992e'} color={'#74992e'} />
                        <Text style={{marginLeft: 5}}>2</Text>
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
    }
});