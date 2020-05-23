import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
import GLOBAL from '../Globals';
import PureChart from 'react-native-pure-chart';

export default class Statistiques extends Component {

    state = {
        nbPoubelles: 0,
        nbSignalements: 0
    }

    componentDidMount() {
        this.getStats();
    }

    async getStats() {
        const url = GLOBAL.BASE_URL + '/api/trash/recente/2020-05-19';
        const response = await fetch(url).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        const res = await response.json();
        if (response.status == 400) {
            alert('Problème de récupération des données');
        }
        else if (response.status == 200) {

            //let utilisateur = res.utilisateur;
            let poubelles = res.poubelle;

            console.log(Object.keys(poubelles).length);
            this.setState({ nbPoubelles: Object.keys(poubelles).length });
        }
    }

    render() {
        let sampleData = [
            {
                value: 50,
                label: 'Marketing',
                color: 'red',
            }, {
                value: 40,
                label: 'Sales',
                color: 'blue'
            }, {
                value: 25,
                label: 'Support',
                color: 'green'
            }

        ]

        return (
            <Container>
                <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <Text style={{ marginRight: 5, marginBottom: 25, fontSize: 30 }}>Depuis 7 jours :</Text>
                    <Item style={{ justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5, paddingBottom: 15, fontSize: 20 }}>{this.state.nbPoubelles} nouvelles poubelles</Text>
                    </Item>
                    <Item style={{ justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5, paddingBottom: 15, fontSize: 20 }}>{this.state.nbSignalements} poubelles signalées</Text>
                    </Item>
                    < PureChart data={sampleData} type='pie' />
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