import React from 'react'; 
import {

    INFINITE_ANIMATION_ITERATIONS,
    WebViewLeaflet,
    AnimationType,
    MapShapeType,
    WebViewLeafletEvents

} from "react-native-webview-leaflet";
import { Button } from "native-base";
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";


export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapCenterPosition: {
                lat: 50.636665,
                lng: 3.069481
            },
            ownPosition: null,
            webViewLeafletRef: null,
            markerPoubelle: null
        }
    }

    setMarkerPoubelle(listPoubelle){
        this.setState({markerPoubelle : listPoubelle})
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
                Alert.alert(
                    `Poubelle ID: ${message.payload.mapMarkerID || "unknown"}`,
                    'Message',
                    [
                        { text: 'GO !', onPress: () => console.log('Appuie sur GO') }
                    ]
                );
                break;
            default:
                null//console.log("App received", message);
        }
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            console.warn("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        if (!this.state.ownPosition) {
            this.setOwnPosition(location.coords.latitude, location.coords.longitude);
        }
    }

    async getPoubelleAsync(){
        const url = 'http://10.0.2.2:3000/poubelles'
        const response = await fetch(url)
        const json = await response.json()
        const poubelles = []
        json.map(item => (
            poubelles.push(
                {
                    id: item.id_poubelle,
                    position: { lat: item.latitude, lng: item.longitude },
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
        ))
        this.setMarkerPoubelle(poubelles)
    }

    componentDidMount() {
        this.getLocationAsync();
        this.getPoubelleAsync();
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={{ flex: 1 }}>
                    {
                        <WebViewLeaflet
                            onMessageReceived={this.onMessageReceived}
                            eventReceiver={this}
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
                                    animation: {
                                        duration: "0.5",
                                        delay: 0,
                                        iterationCount: INFINITE_ANIMATION_ITERATIONS,
                                        type: AnimationType.PULSE
                                    } //si tu veux le voir bondir 

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
                            mapShapes={[
                                {
                                    shapeType: MapShapeType.CIRCLE,
                                    color: "#123123",
                                    id: "1",
                                    center: this.state.mapCenterPosition,
                                    radius: 2000
                                }]}
                            zoom={50}
                        />
                    }
                </View>

                <View style={styles.mapControls}>
                    <Button
                        onPress={() => {
                            this.getLocationAsync();
                            this.setMapCenterPosition(this.state.ownPosition.lat, this.state.ownPosition.lat.lng);
                            if (this.state.webViewLeafletRef)
                                this.state.webViewLeafletRef.setMapCenterPosition();
                        }}
                        style={styles.mapButton}
                        success
                    >
                        <Text style={styles.mapButtonEmoji}>🎯</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
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
        height: 42,
        justifyContent: "center",
        width: 42
    },
    mapButtonEmoji: {
        fontSize: 28
    }
});
