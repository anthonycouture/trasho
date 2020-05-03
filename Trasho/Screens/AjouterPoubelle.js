import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Left, Right, Icon, Container, Content } from 'native-base';
import PickerType from '../Components/PickerType';
import Globals from '../Globals';

export default class AjouterPoubelle extends Component {

    state = {
        listTypes : null,
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
            this.setState({
                listTypes : Object.values(res.type_poubelle),
                display: true
            });
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
                            <PickerType canDelete={false} typeList={this.state.listTypes}/>
                            <PickerType canDelete={true} typeList={this.state.listTypes}/>
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
    }
});