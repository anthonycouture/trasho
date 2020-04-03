import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

export default class ModalInfoPoubelle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text style={styles.modalText}>Id Poubelle : {this.props.idPoubelle}</Text>
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
