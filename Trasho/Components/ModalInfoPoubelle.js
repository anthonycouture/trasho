import React from 'react';
import { Image, Text, StyleSheet, View, Button, TouchableHighlight } from 'react-native';
import base64 from 'react-native-base64'
import GLOBAL from '../Globals';
import Globals from '../Globals';

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

    signalePoubelle() {
        const url = GLOBAL.BASE_URL + '/api/report/addSignalementDelete'
        const body = 'idPoubelle=' + this.state.idPoubelle + '&mail=' + Globals.email;
        fetch(url,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: body
            }
        ).then((response) => {
            if (response.status !== 200) {
                alert("Un problème est survenu")
            }else{
                alert("Le signalement a été pris en compte !")
            }
        }).catch((error) => {
            console.error(error);
            alert("Une erreur est survenu")
        });
    }

    supprimePoubelle() {
        const url = GLOBAL.BASE_URL + '/api/trash/delete-poubelle'
        const body = 'id=' + this.state.idPoubelle;
        fetch(url,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: body
            }
        ).then((response) => {
            if (response.status !== 200) {
                alert("Un problème est survenu")
            }else{
                alert("Le signalement a été pris en compte !")
            }
        }).catch((error) => {
            console.error(error);
            alert("Une erreur est survenu")
        });
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
                {
                    (GLOBAL.connected && !GLOBAL.admin) &&
                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            this.signalePoubelle();
                        }}
                    >

                        <Text style={styles.textStyle}>Signaler</Text>
                    </TouchableHighlight>
                }
                {
                    GLOBAL.admin &&
                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            this.supprimePoubelle();
                        }}
                    >

                        <Text style={styles.textStyle}>Supprimer</Text>
                    </TouchableHighlight>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#FF0000",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});
