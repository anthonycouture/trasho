import React from 'react';
import { StyleSheet, View } from 'react-native';
import Api from './Component/Api';

export default function App() {
  return (
    <View style={styles.container}>
      <Api/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
