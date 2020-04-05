import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

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
        const url = 'http://10.0.2.2:3000/getTypePoubelle?idPoubelle=' + this.state.idPoubelle
        const response = await fetch(url)
        const json = await response.json()
        this.setTypePoubelle(
            <View>
                <Text>Type de la poubelle : </Text>
                {json.map(item => (
                    <Text>{item.type}</Text>
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
