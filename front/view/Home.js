import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';



import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("sk.eyJ1IjoiYW50b2JveDI4IiwiYSI6ImNrODRldTRxbjBvazkza3F0bXY0aWNkZW0ifQ.z_spTi4iXubOdClQnjH2oA");
class Home extends React.Component{
    componentDidMount() {
        MapboxGL.setTelemetryEnabled(false);
      }
      render() {
        const features = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [3.06959, 50.636763],
          }
        }
        return (
          <View style={styles.page}>
            <View style={styles.container}>
              <MapboxGL.MapView
                style={styles.map}
                centerCoordinate={[
                  3.06959, 50.636763
                ]}
              >
                <MapboxGL.PointAnnotation
                  id={"flandre"}
                  coordinate={[
                    3.06959, 50.636763
                  ]}
                  title="Gare Lille Flandre">
                  <View style={styles.annotationContainer}>
                    <Image
                      source={require('../assets/marker.png') }
                      style={{ width: ANNOTATION_SIZE, height: ANNOTATION_SIZE }}
                    />
                  </View>
                  <MapboxGL.Callout title="Gare Lille Flandre" />
                </MapboxGL.PointAnnotation>
              </MapboxGL.MapView>
            </View>
          </View>
        );
      }
}


const ANNOTATION_SIZE = 30;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE
  },
});

export default Home