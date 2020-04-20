//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
// import all basic components

export default class Admin extends Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem bordered style={{ justifyContent: 'center', color: 'black' }}>
                            <Button transparent
                                onPress={
                                    () => alert('Liste utilisateurs')
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
                                    () => alert('Liste poubelles')
                                }>
                                <Icon name={'trash'} style={styles.black} />
                                <Text style={styles.black}>Liste poubelles</Text>
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