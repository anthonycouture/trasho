import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Container, Content, Button, ListItem, CheckBox, Body, Text, Toast } from 'native-base';
import Globals from '../Globals';

export default class AjouterPoubelle extends Component {

    state = {
        listTypes : null,
        mapSelected : null,
    }

    async componentDidMount(){
        await this._loadAllType().then();
    }

    /**
     * Load all types of database
     *
     * @memberof AjouterPoubelle
     */
    async _loadAllType(){
        const url =  Globals.BASE_URL + '/api/type';
        const response = await fetch(url).catch((err) => {
            console.error(err);
        });
        const res = await response.json();
        if (response.status != 200){
            Toast.show({
                text: "Problème de communication !",
                duration : 2000,
                type: "danger"
            });
        } else {
            const map = new Map();
            const allTypes = [];
            Object.values(res.type_poubelle).forEach(element => {
                allTypes.push(element.type);
                map.set(element.type, false);
            });

            this.setState({
                listTypes : allTypes,
                mapSelected : map,
            });
        }
    }

    _handleCheckbox(type){
        var newMap = this.state.mapSelected;
        newMap.set(type, !newMap.get(type));
        this.setState({
            mapSelected : newMap,
        });
    }

    _validTypes(){
        var allTypes = []
        for(var [key, value] of this.state.mapSelected){
            if(value){
                allTypes.push(key);
            }
        }
        if(allTypes.length == 0){
            Toast.show({
                text: "Vous devez sélectionner au moins un type !",
                buttonText: "Okay !",
                duration : 4000,
                type: "danger"
            });
        } else {
            console.log(allTypes);
        }
    }

    render() {
        if(this.state.listTypes !== null){
            return (
                <Container>
                    <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                        <View style={styles.view_trash_icon}>
                            <Icon type="EvilIcons" name="trash" style={styles.trash_icon}></Icon>
                        </View>
                        <View style={styles.view_type}>
                            {
                                this.state.listTypes.map((type) => {
                                    return(
                                        <ListItem onPress={() => this._handleCheckbox(type)} key={type}>
                                            <CheckBox checked={this.state.mapSelected.get(type)} color="#74992e"/>
                                            <Body>
                                                <Text>{type}</Text>
                                            </Body>
                                        </ListItem>
                                    );
                                })
                            } 
                            <Button success iconLeft block onPress={() => this._validTypes()}>
                                <Icon type="Feather" name="check"/>
                                <Text>Valider</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            );
        } else {
            return <Text>Loading...</Text>;
        }
    }
}

const styles = StyleSheet.create({
    view_trash_icon : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    trash_icon : {
        fontSize: 300,
        color: '#74992e',
    },
    view_type:{
        flex: 1
    },
    add_button : {
        margin: 5,
    }
});