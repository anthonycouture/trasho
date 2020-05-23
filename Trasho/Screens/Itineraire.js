import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Text, Button, Icon } from 'native-base';
import {Picker} from '@react-native-community/picker';

export default class Itineraire extends Component {
    render() {
        return (
            <Container>
                <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <Form>
                        <Text style={styles.text}> Point de départ : </Text>
                        <Item style={{ borderColor: 'transparent' }}>
                            <Item style={{ marginRight: 50 }}>
                                <Input placeholder="Email" onChangeText={this.handleEmail} />
                                <Icon name='checkmark-circle' />
                            </Item>
                        </Item>
                        <Text style={styles.text}> Point d'arrivée : </Text>
                        <Item style={{ borderColor: 'transparent' }}>
                            <Item style={{ marginRight: 50 }}>
                                <Input placeholder="Email" onChangeText={this.handleEmail} />
                                <Icon name='checkmark-circle' />
                            </Item>
                        </Item>
                    </Form>
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
});