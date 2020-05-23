import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
import GLOBAL from '../Globals';
import PureChart from 'react-native-pure-chart';

export default class Statistiques extends Component {

    state = {
        nbPoubelles: 0,
        nbSignalements: 0,
        percentRecyclable: 1,
        percentVerre: 1,
        percentToutDechet: 1,
        labelRecyclable: '',
        labelVerre: '',
        labelToutDechet: ''
    }

    componentDidMount() {
        this.getStats();
        this.getPercentsTrash();
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

    async getPercentsTrash() {
        const url = GLOBAL.BASE_URL + '/api/trash/poubellesDates/2020-05-18/2020-05-23';
        const response = await fetch(url).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        const res = await response.json();
        if (response.status != 200) {
            alert('Problème de récupération des données');
        }
        else {

            //let utilisateur = res.utilisateur;
            let poubelles = res.poubelle;

            console.log(poubelles);
            
            let nbRecyclable = 0;
            let nbVerre = 0;
            let nbToutDechet = 0;
            let nbTotal = 0;

            for (let key in poubelles) {
                if(poubelles[key].type == 1) {
                    nbRecyclable += 1;
                }
                else if(poubelles[key].type == 2) {
                    nbVerre += 1;
                }
                else if(poubelles[key].type == 3) {
                    nbToutDechet += 1;
                }
                nbTotal += 1;
            }

            this.setState({percentRecyclable: nbRecyclable/nbTotal*100});
            this.setState({percentVerre: nbVerre/nbTotal*100});
            this.setState({percentToutDechet: nbToutDechet/nbTotal*100});
            this.setState({labelRecyclable: 'Recyclable (' + nbRecyclable + ')'});
            this.setState({labelVerre: 'Verre (' + nbVerre + ')'});
            this.setState({labelToutDechet: 'Tout déchet (' + nbToutDechet + ')'});

            console.log("nbRecy : " + nbRecyclable);
            console.log("nbVerre : " + nbVerre);
            console.log("nbTout : " + nbToutDechet);
            console.log("nbTotal : " + nbTotal);

            console.log("percentRec : " + this.state.percentRecyclable);
            console.log("percentVerre : " + this.state.percentVerre);
            console.log("percentTout : " + this.state.percentToutDechet);
        }
    }

    render() {
        let statsData = [
            {
                value: this.state.percentRecyclable,
                label: this.state.labelRecyclable,
                color: 'gray',
            }, {
                value: this.state.percentVerre,
                label: this.state.labelVerre,
                color: 'green'
            }, {
                value: this.state.percentToutDechet,
                label: this.state.labelToutDechet,
                color: 'black'
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
                    <Item style={{ justifyContent: 'center', marginTop: 50, borderBottomColor: 'white' }}>
                        < PureChart data={statsData} type='pie' />
                    </Item>
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}> Types des nouvelles poubelles </Text>
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