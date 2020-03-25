/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';



import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("sk.eyJ1IjoiYW50b2JveDI4IiwiYSI6ImNrODRldTRxbjBvazkza3F0bXY0aWNkZW0ifQ.z_spTi4iXubOdClQnjH2oA");

class App extends React.Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
      </View>
    );
  }
};

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
  }
});

export default App;
