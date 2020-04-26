import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import base64 from 'react-native-base64'
import GLOBAL from '../Globals';

export default class ModalInfoPoubelle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idPoubelle: this.props.idPoubelle,
            typePoubelle: null,
            photo: '',
        }
    }

    setTypePoubelle(type) {
        this.setState({ typePoubelle: type });
    }

    setPhoto(photoUrl) {
        this.setState({ photo: photoUrl });
    }

    componentDidMount() {
        this.getTypePoubelleAsync();
        this.getPhotoPoubelle();
    }


    async getTypePoubelleAsync() {
        const url = GLOBAL.BASE_URL + '/api/trash/type/' + this.state.idPoubelle
        const response = await fetch(url)
        const json = await response.json()
        this.setTypePoubelle(
            json.map(item => (
                <Text>- {item}</Text>
            ))
        );
    }

    async getPhotoPoubelle() {
        const url = GLOBAL.BASE_URL + '/api/trash/url/' + this.state.idPoubelle
        const response = await fetch(url)
        const json = await response.json()
        const base64Icon = json;
        this.setPhoto(
            base64Icon
        );
    }


    render() {
        return (
            <View>
                <Text>Type de la poubelle : </Text>
                {this.state.typePoubelle}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        source={{ uri: this.state.photo }}
                        style={{ width: 100, height: 120, alignItems: 'center' }}
                    />
                </View>
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
