import React from 'react';
import { Image, Text, StyleSheet, View, TouchableHighlight, Modal } from 'react-native';
import GLOBAL from '../Globals';

export const MessageModal = {
    SUPPRESSION_POUBELLE: "SUPPRESSION_POUBELLE"
};

export default class ModalInfoPoubelle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
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

    componentDidUpdate(prevProps) {
        if (prevProps.idPoubelle !== this.props.idPoubelle) {
            this.getTypePoubelleAsync();
            this.getPhotoPoubelle();
        }
    }


    async getTypePoubelleAsync() {
        const url = GLOBAL.BASE_URL + '/api/trash/type/' + this.props.idPoubelle
        const response = await fetch(url)
        const json = await response.json()
        this.setTypePoubelle(
            json.map(item => (
                <Text>- {item}</Text>
            ))
        );
    }

    async getPhotoPoubelle() {
        const url = GLOBAL.BASE_URL + '/api/trash/url/' + this.props.idPoubelle
        const response = await fetch(url)
        const json = await response.json()
        const base64Icon = json;
        this.setPhoto(
            base64Icon
        );
    }

    signalePoubelle() {
        const url = GLOBAL.BASE_URL + '/api/report/addSignalementDelete'
        const body = 'idPoubelle=' + this.props.idPoubelle + '&mail=' + GLOBAL.email;
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
            } else {
                alert("Le signalement a été pris en compte !")
            }
        }).catch((error) => {
            console.error(error);
            alert("Une erreur est survenu")
        });
    }

    supprimePoubelle() {
        const url = GLOBAL.BASE_URL + '/api/trash/delete-poubelle'
        const body = 'id=' + this.props.idPoubelle;
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
            } else {
                alert("La poubelle est suppimer !")
                this.props.messageModal(MessageModal.SUPPRESSION_POUBELLE, this.props.idPoubelle);
                this.props.affichemodal(false);
            }
        }).catch((error) => {
            console.error(error);
            alert("Une erreur est survenu")
        });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                this.props.affichemodal(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
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
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});
