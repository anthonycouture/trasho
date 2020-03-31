import React, {useState, useEffect} from 'react';
import {

  INFINITE_ANIMATION_ITERATIONS,
  LatLng,
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
  AnimationType,
  MapShapeType

} from "react-native-webview-leaflet";
import { Button } from "native-base";
import { StyleSheet, Text, View, Dimensions,Alert } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";


export default function App() {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat:  50.6436348,
    lng: 3.0900153
  });
  const [ownPosition, setOwnPosition] = useState(null);
  const [webViewLeaflet, setWebViewLeaflet] = useState(null);

  const onMessageReceived = (message)=> {switch (message.event) {default:;}}

  useEffect(() => {
      getLocationAsync();
  });

  const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!ownPosition) {
        setOwnPosition ({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      }
    };


    return (
      <View style = {styles.container} >
      	<View style = {styles.header} >
      		<Text style={styles.headerText}>React Native Webview Leaflet Demo</Text>
        </View>
      <View style={{ flex: 1 }}>
      {
        <WebViewLeaflet
            ref={(component) => (setWebViewLeaflet(component))}

            onMessageReceived={onMessageReceived}
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
           mapMarkers={[
		{
			id:'2',
		       position: {lat:  50.9436348,lng: 3.0900153 },
	               icon: "https://i.ya-webdesign.com/images/google-maps-pin-png-4.png",
	               size: [24, 32],	
			/*animation: {
		         duration: "0.5",
		         delay: 0,
		         iterationCount: INFINITE_ANIMATION_ITERATIONS,
		         type: AnimationType.JUMP
		       }	*/
		}
	   ]}
           mapCenterPosition={mapCenterPosition}
           ownPositionMarker={
             ownPosition && {
               position: ownPosition,
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
                center:  mapCenterPosition ,
                radius: 2000
              }]}
           zoom={50}
/>
}
</View>

<View style={styles.mapControls}>
       <Button
         onPress={() => {
           getLocationAsync();
           setMapCenterPosition(ownPosition);
           if (webViewLeaflet)
                webViewLeaflet.setMapCenterPosition();
            console.log(ownPosition);
		console.log(AnimationType);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 60,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%"
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
