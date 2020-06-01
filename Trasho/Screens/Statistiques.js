import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Card, CardItem, Text, Body, Item, Button, Icon } from "native-base";
import GLOBAL from '../Globals';
import PureChart from 'react-native-pure-chart';
import Globals from '../Globals';

export default class Statistiques extends Component {

    state = {
        nbPoubelles: 0,
        nbSignalements: 0,
        percentRecyclable: 1,
        percentVerre: 1,
        percentToutDechet: 1,
        labelRecyclable: '',
        labelVerre: '',
        labelToutDechet: '',
        nbRecyclable: 0,
        nbVerre: 0,
        nbToutDechet: 0,
        statsData: [
            {
                value: 1,
                label: '',
                color: 'gray',
            },
            {
                value: 1,
                label: '',
                color: 'gray',
            }
        ]
    }

    componentDidMount() {
        this.getStats();
        this.getPercentsTrash();
        console.log("eeeeeeeeeeeeeeeee");
    }

    calculDate() {
        let currentDate = new Date();
        let annee = currentDate.getFullYear();
        let mois = currentDate.getMonth() + 1;
        let jour = currentDate.getDate();
        var date = 'dsds';

        if ((jour - 7) > 0) {
            jour = jour - 7;
            date = annee + '-' + this.refactorMonth(mois) + '-' + this.refactorDay((jour));
        }
        else {
            if ((mois - 1) > 0) {
                jour = jour + 31 - 7;
                mois = mois - 1;
                date = annee + '-' + this.refactorMonth(mois) + '-' + this.refactorDay((jour));
            }
            else {
                annee = annee - 1;
                jour = jour + 31 - 7;
                date = annee + '-' + '12' + jour;
            }
        }
        return date;
    }

    refactorMonth(month) {
        if (month < 10) {
            month = '0' + month;
        }
        return month;
    }

    refactorDay(day) {
        if (day < 10) {
            day = '0' + day;
        }
        return day;
    }

    async getStats() {
        let dateSeptJours = this.calculDate();
        const url = GLOBAL.BASE_URL + '/api/trash/' + Globals.url_base_admin + '/recente/' + dateSeptJours;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "token_api": GLOBAL.token_api,
                "token_user": GLOBAL.token_user
            }
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        const res = await response.json();
        if (response.status == 400) {
            alert('Problème de récupération des données');
        }
        else if (response.status == 200) {

            let poubelles = res.poubelle;

            this.setState({ nbPoubelles: Object.keys(poubelles).length });
        }
    }

    async getPercentsTrash() {

        let date1 = this.calculDate();
        let currentDate = new Date();
        let annee = currentDate.getFullYear();
        let mois = currentDate.getMonth() + 1;
        let jour = currentDate.getDate();
        let date2 = annee + '-' + this.refactorMonth(mois) + '-' + this.refactorDay(jour);

        const url = GLOBAL.BASE_URL + '/api/trash/' + Globals.url_base_admin + '/poubellesDates/' + date1 + '/' + date2;

        console.log(url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "token_api": GLOBAL.token_api,
                "token_user": GLOBAL.token_user
            }
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        const res = await response.json();
        if (response.status != 200) {
            alert('Problème de récupération des données');
        }
        else {
            await this.storeDataTrash(res);
        }
    }

    async storeDataTrash(res) {
        if (res.percentRecyclable != 0 || res.percentVerre != 0 || res.percentToutDechet != 0) {
            this.setState({ percentRecyclable: res.percentRecyclable });
            this.setState({ percentVerre: res.percentVerre });
            this.setState({ percentToutDechet: res.percentToutDechet });
            this.setState({ nbRecyclable: res.nbRecyclable });
            this.setState({ nbVerre: res.nbVerre });
            this.setState({ nbToutDechet: res.nbToutDechet });
            let labelRecyclable = 'Recyclable (' + res.nbRecyclage + ')';
            this.setState({ labelRecyclable: labelRecyclable });
            let labelVerre = 'Verre (' + res.nbVerre + ')';
            this.setState({ labelVerre: labelVerre });
            let labelToutDechet = 'Tout déchet (' + res.nbToutDechet + ')';
            this.setState({ labelToutDechet: labelToutDechet });

            console.log('percentRe : ' + this.state.percentRecyclable);
            console.log('percentVer : ' + this.state.percentVerre);
            console.log('percentTout : ' + this.state.percentToutDechet);

            let stats = [];

            let objRecyclable = {
                value: this.state.percentRecyclable,
                label: this.state.labelRecyclable,
                color: 'gray',
            };

            let objVerre = {
                value: this.state.percentVerre,
                label: this.state.labelVerre,
                color: 'green'
            };

            let objToutDechet = {
                value: this.state.percentToutDechet,
                label: this.state.labelToutDechet,
                color: 'black'
            }

            if (res.nbRecyclage > 0) {
                console.log("Oui recy");
                stats.push(objRecyclable);
            }

            if (res.nbVerre > 0) {
                console.log("Oui verre");
                stats.push(objVerre);
            }

            if (res.nbToutDechet > 0) {
                console.log("Oui tout");
                stats.push(objToutDechet);
            }

            console.log(stats);

            this.setState({ statsData: stats });
        }
        else {
            alert("Aucune poubelle ajoutée récemment !");
        }
    }

    render() {
        
        
        console.log(this.state.statsData);
        let statsData = this.state.statsData;


        return (
            <Container>
                <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <Item style={{ borderColor: 'white', marginLeft: 15, marginRight: 15, marginTop: 20 }}>
                        <Text style={{ marginRight: 5, marginBottom: 25, fontSize: 30 }}>Depuis 7 jours :</Text>
                        <Icon style={{ marginLeft: 120, marginBottom: 15, fontSize: 30 }} name="refresh" onPress={() => { console.log("clic"), this.getStats(); this.getPercentsTrash(); }} />
                    </Item>
                    <Item style={{ justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5, paddingBottom: 15, fontSize: 20 }}>{this.state.nbPoubelles} nouvelles poubelles</Text>
                    </Item>
                    <Item style={{ justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ marginRight: 5, paddingBottom: 15, fontSize: 20 }}>{this.state.nbSignalements} poubelles signalées</Text>
                    </Item>
                    <Item style={{ justifyContent: 'center', borderBottomColor: 'white' }}>
                        < PureChart data={statsData} type='pie' />
                    </Item>
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}> Types des nouvelles poubelles </Text>
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