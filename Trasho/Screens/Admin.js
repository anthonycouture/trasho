import React, { Component } from 'react';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";

import { StyleSheet, View, AsyncStorage } from 'react-native';

export default class Admin extends Component {

    async componentDidMount() {
        console.log("componentDidMount");
        await AsyncStorage.clear();
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                            <Button transparent
                                onPress={
                                    () => this.props.navigation.navigate('ListeUtilisateurs')
                                }>
                                <Icon name={'person'} style={styles.black} />
                                <Text style={styles.black}>Liste utilisateurs</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                            <Button transparent
                                onPress={
                                    () => alert('Statistiques')
                                }>
                                <Icon name={'stats'} style={styles.black} />
                                <Text style={styles.black}>Statistiques</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    
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