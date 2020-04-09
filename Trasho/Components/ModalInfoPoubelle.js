import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import base64 from 'react-native-base64'
import GLOBAL from '../Globals';

export default class ModalInfoPoubelle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idPoubelle: this.props.idPoubelle,
            typePoubelle: null
        }
    }

    setTypePoubelle(type) {
        this.setState({ typePoubelle: type });
    }

    componentDidMount() {
        this.getTypePoubelleAsync();
    }


    async getTypePoubelleAsync() {
        const url = GLOBAL.BASE_URL + '/api/trash/type/' + this.state.idPoubelle
        const response = await fetch(url)
        const json = await response.json()
        this.setTypePoubelle(
            <View>
                <Text>Type de la poubelle : </Text>
                {json.map(item => (
                    <Text>{item}</Text>
                ))}
            </View>
        );
    }

    render() {
        return (
            <View>
                {this.state.typePoubelle}
                <Image
                    source={require('./../Images/drawer.png')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
