import React from 'react';
import {
    WebViewLeaflet,
    MapShapeType,
    WebViewLeafletEvents
} from "react-native-webview-leaflet";
import { Button, Icon, ListItem, CheckBox } from "native-base";
import { StyleSheet, View, TouchableHighlight, Modal, Text } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import ModalInfoPoubelle, { MessageModal } from './../Components/ModalInfoPoubelle';

import GLOBAL from '../Globals';


export default class MapPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapCenterPosition: {
                lat: 50.636665,
                lng: 3.069481
            },
            ownPosition: null,
            webViewLeafletRef: null,
            markerPoubelle: null,
            modalTypeVisible: false,
            listTypes: [],
            idPoubelle: null,
            modal: false,
            positions: []
        }
    }

    setModal = (visible) => {
        this.setState({ modal: visible })
    }

    setPositions(itineraire) {
        this.setState({ positions: itineraire })
    }

    setIdPoubelle(idPoubelle) {
        this.setState({ idPoubelle: idPoubelle })
    }

    setMarkerPoubelle(listPoubelle) {
        this.setState({ markerPoubelle: listPoubelle })
    }

    setMapCenterPosition(lat, lng) {
        this.setState({
            mapCenterPosition: {
                lat: lat,
                lng: lng
            }
        })
    }

    setOwnPosition(lat, lng) {
        this.setState({
            ownPosition: {
                lat: lat,
                lng: lng
            }
        })
    }

    setWebViewLeafletRef(webViewLeafletRef) {
        this.setState({ webViewLeafletRef: webViewLeafletRef })
    }

    onMessageReceived = (message) => {
        switch (message.event) {
            case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
                if (message.payload.mapMarkerID !== 'OWN_POSTION_MARKER_ID') {
                    this.setIdPoubelle(message.payload.mapMarkerID);
                    this.setModal(true);
                }
                break;
            default:
                null;//console.log("App received", message);
        }
    }

    messageModal = (message, idPoubelle) => {
        switch (message) {
            case MessageModal.SUPPRESSION_POUBELLE:
                // Je l'améliorerais plus tard
                /*let poubelleDelete;
                this.state.markerPoubelle.forEach(function (item) {
                    if (item.id === idPoubelle) {
                        poubelleDelete = item;
                        return;
                    }
                });
                let newListeMarker = this.state.markerPoubelle;
                newListeMarker.splice(newListeMarker.indexOf(poubelleDelete), 1);
                this.setMarkerPoubelle(newListeMarker);
                this.addMarkerPoubelle(newListeMarker);*/
                this.getPoubelleAsync();
                break;
            default:
                null;
        }
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            console.warn("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        if (!this.state.ownPosition) {
            //this.setOwnPosition(location.coords.latitude, location.coords.longitude);
            //this.setMapCenterPosition(location.coords.latitude, location.coords.longitude);
            this.setOwnPosition(50.636665, 3.069481);
            this.setMapCenterPosition(50.636665, 3.069481);
        }
    }

    addMarkerPoubelle(poubelle) {
        const poubelles = []
        for (let key in poubelle) {
            poubelles.push(
                {
                    id: key.substring(1),
                    position: { lat: poubelle[key].latitude, lng: poubelle[key].longitude },
                    icon: "https://i.ya-webdesign.com/images/google-maps-pin-png-4.png",
                    size: [24, 32],
                    /*animation: {
                         duration: "0.5",
                         delay: 0,
                         iterationCount: INFINITE_ANIMATION_ITERATIONS,
                         type: AnimationType.JUMP
                       }*/
                }
            )
        }
        this.setMarkerPoubelle(poubelles)
    }

    async getPoubelleAsync() {
        const url = GLOBAL.BASE_URL + '/api/trash'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "token_api": GLOBAL.token_api
            }
        })
        const json = await response.json()
        this.addMarkerPoubelle(json.poubelle)
    }

    /**
     * Load all types of database
     *
     * @memberof Map
     */
    async _loadAllType() {
        const url = GLOBAL.BASE_URL + '/api/type';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "token_api": GLOBAL.token_api
            }
        }).catch((err) => {
            console.error(err);
        });
        const res = await response.json();
        if (response.status != 200) {
            Toast.show({
                text: "Problème de communication !",
                duration: 2000,
                type: "danger"
            });
        } else {
            const mapType = new Map();
            const allTypes = [];
            Object.values(res.type_poubelle).forEach(element => {
                allTypes.push(element.type);
                mapType.set(element.type, false);
            });

            this.setState({
                listTypes: allTypes,
                mapSelected: mapType,
            });
        }
    }

    /**
     * Handle the click on item checkbox to change the checkbox value
     *
     * @param {*} type
     * @memberof Map
     */
    _handleCheckbox(type) {
        var newMap = this.state.mapSelected;
        newMap.set(type, !newMap.get(type));
        this.setState({
            mapSelected: newMap,
        });
    }

    /**
     * Filter trash types
     */
    async filterTrash() {
        var allTypes = []
        for (var [key, value] of this.state.mapSelected) {
            if (value) {
                allTypes.push(key);
            }
        }
        if (allTypes.length == 0) {
            this.setState({ modalTypeVisible: false })
            return this.getPoubelleAsync();
        }
        const url = GLOBAL.BASE_URL + '/api/trash/byType/name';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "token_api": GLOBAL.token_api,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: allTypes
            })
        });
        const json = await response.json();
        this.setState({ modalTypeVisible: false });
        this.addMarkerPoubelle(json.poubelle);
    }

    componentDidMount() {
        this.itineraire();
        this.getLocationAsync();
        this.getPoubelleAsync();
        this._loadAllType();
        this.props.navigation.addListener('willFocus', payload => {
            this.getLocationAsync();
            this.getPoubelleAsync();
            this._loadAllType();
        });
    }

    modalType() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalTypeVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Type sélectionné :</Text>
                        {
                            this.state.listTypes.map((type) => {
                                return (
                                    <ListItem onPress={() => this._handleCheckbox(type)} key={type}>
                                        <CheckBox checked={this.state.mapSelected.get(type)} color="#74992e" />
                                        <Text>      {type}</Text>
                                    </ListItem>
                                );
                            })
                        }
                        <Button block success onPress={() => this.filterTrash()}>
                            <Text>Valider</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }

    itineraire() {
        let pos = [
            [
                2.507612,
                50.469193
            ],
            [
                2.514853,
                50.471134
            ],
            [
                2.516015,
                50.471451
            ],
            [
                2.518716,
                50.472633
            ],
            [
                2.518733,
                50.47303
            ],
            [
                2.52004,
                50.473648
            ],
            [
                2.533972,
                50.464725
            ],
            [
                2.543138,
                50.454483
            ],
            [
                2.544347,
                50.453278
            ],
            [
                2.544421,
                50.453148
            ],
            [
                2.544722,
                50.452946
            ],
            [
                2.551882,
                50.451164
            ],
            [
                2.57072,
                50.452465
            ],
            [
                2.610825,
                50.442486
            ],
            [
                2.634942,
                50.444347
            ],
            [
                2.670811,
                50.435616
            ],
            [
                2.711165,
                50.434448
            ],
            [
                2.775477,
                50.439964
            ],
            [
                2.797966,
                50.450272
            ],
            [
                2.814693,
                50.451839
            ],
            [
                2.834814,
                50.449158
            ],
            [
                2.845092,
                50.442287
            ],
            [
                2.851108,
                50.430172
            ],
            [
                2.873147,
                50.434528
            ],
            [
                2.888042,
                50.431381
            ],
            [
                2.944365,
                50.432407
            ],
            [
                2.969821,
                50.429787
            ],
            [
                2.976291,
                50.427872
            ],
            [
                2.98204,
                50.430172
            ],
            [
                2.976212,
                50.435989
            ],
            [
                2.971043,
                50.451488
            ],
            [
                2.983469,
                50.483524
            ],
            [
                2.992085,
                50.491138
            ],
            [
                3.034496,
                50.514633
            ],
            [
                3.063692,
                50.555656
            ],
            [
                3.102757,
                50.596104
            ],
            [
                3.101591,
                50.603596
            ],
            [
                3.086798,
                50.613663
            ],
            [
                3.080864,
                50.618771
            ],
            [
                3.082015,
                50.620945
            ],
            [
                3.082873,
                50.621685
            ],
            [
                3.082489,
                50.629269
            ],
            [
                3.082483,
                50.63361
            ],
            [
                3.075725,
                50.640724
            ],
            [
                3.074695,
                50.642323
            ],
            [
                3.073084,
                50.643322
            ],
            [
                3.072066,
                50.643391
            ],
            [
                3.070404,
                50.641552
            ],
            [
                3.070806,
                50.641239
            ],
            [
                3.065942,
                50.639034
            ],
            [
                3.065144,
                50.638145
            ],
            [
                3.065871,
                50.637878
            ],
            [
                3.065211,
                50.637146
            ],
            [
                3.064871,
                50.637016
            ],
            [
                3.064284,
                50.636745
            ],
            [
                3.063894,
                50.636768
            ]
        ];
        let addPossition = []
        pos.forEach(element =>
            addPossition.push(
                { lat: element[1], lng: element[0] }
            )
        );
        this.setPositions(addPossition)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.modalType()}
                {<ModalInfoPoubelle
                    idPoubelle={this.state.idPoubelle}
                    visible={this.state.modal}
                    affichemodal={this.setModal}
                    messageModal={this.messageModal}
                />}

                {
                    <WebViewLeaflet
                        onMessageReceived={this.onMessageReceived}
                        eventReceiver={this}
                        mapShapes={[
                            {
                                shapeType: MapShapeType.POLYLINE,
                                color: "#000000",
                                id: "1",
                                positions: this.state.positions
                            }
                        ]}
                        mapLayers={[{
                            attribution:
                                '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                            baseLayerIsChecked: true,
                            baseLayerName: "Fr OSM",
                            url: "http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        },

                        {
                            attribution:
                                '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                            baseLayerName: "OpenStreetMap.Mapnik",
                            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                        }

                        ]}
                        mapMarkers={this.state.markerPoubelle}
                        mapCenterPosition={this.state.mapCenterPosition}
                        ownPositionMarker={
                            this.state.ownPosition && {
                                position: this.state.ownPosition,
                                icon: "https://www.stickpng.com/assets/images/58889219bc2fc2ef3a1860aa.png",
                                size: [24, 32],
                                /*animation: {
                                    duration: "0.5",
                                    delay: 0,
                                    iterationCount: INFINITE_ANIMATION_ITERATIONS,
                                    type: AnimationType.PULSE
                                } *///si tu veux le voir bondir 

                                /*
                                
                                AnimationType possible : 
                                  "BOUNCE",
                                  "FADE",
                                  "JUMP",
                                  "PULSE",
                                  "SPIN", 
                                  "WAGGLE",
                                
                                */


                            }
                        }
                        zoom={50}
                    />
                }


                <View style={styles.mapControls}>
                    <Button
                        onPress={() => {
                            this.getLocationAsync();
                        }}
                        style={styles.mapButton}
                        success
                    >
                        <Text style={styles.mapButtonEmoji}>🎯</Text>
                    </Button>
                    <Button
                        onPress={() => {
                            this.setState({ modalTypeVisible: true });
                        }}
                        style={styles.mapButton}
                        success
                    >
                        <Icon type="FontAwesome" name="filter" />
                    </Button>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    mapControls: {
        backgroundColor: "rgba(255,255,255,.5)",
        borderRadius: 5,
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        left: 0,
        marginHorizontal: 10,
        padding: 7,
        position: "absolute",
        right: 0
    },
    mapButton: {
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        width: 50
    },
    mapButtonEmoji: {
        fontSize: 28
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    openButton: {
        backgroundColor: "#F194FF",
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
