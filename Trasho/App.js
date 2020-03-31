import React, { useState, useEffect } from 'react';
import {

  INFINITE_ANIMATION_ITERATIONS,
  LatLng,
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
  AnimationType,
  MapShapeType

} from "react-native-webview-leaflet";
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";


export default class App extends React.Component {
  ownPosition;

  onMessageReceived(message) {
    switch (message.event) {
      default:
        //console.log("App received", message)
        ;
    }
  }



  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    if (!this.ownPosition) {
      this.ownPosition = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      console.log("Position : ", this.ownPosition);
    }
  };


  render() {
    (() => {
      this.getLocationAsync();
    })();

    return (
      //<View >
      <WebViewLeaflet
        ref={(component) => (this.webViewLeaflet = component)}
        onLoad={this.onLoad}
        onMessageReceived={this.onMessageReceived}
        eventReceiver={this}
        mapLayers={[
          {
            attribution:
              '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap.Mapnik",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          },
          {
            baseLayerName: "Mapbox",
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            // url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
            attribution:
              "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          }
        ]}
        mapCenterPosition={this.ownPosition}
        ownPositionMarker={
          this.ownPosition && {
            position: this.ownPosition,
            icon: "O",
            size: [32, 32],
            animation: {
              duration: getDuration(),
              delay: getDelay(),
              iterationCount,
              type: AnimationType.BOUNCE
            }
          }
        }
        zoom={7}// the component that will receive map events
      />

      //  <MapView style={styles.mapStyle} />
      //      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
