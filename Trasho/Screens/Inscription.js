import React, { Component } from 'react';
import { StyleSheet, View, Image, Button, TextInput, Dimensions } from 'react-native';
import { Icon } from 'native-base';

export default class Inscription extends Component {
  goBackPage(){
    console.log("Go Back");    
  }

  checkRegistration(){
    console.log("checkRegistration");    
  }

  render() {
    return (
      <View style={styles.MainContainer}>
          <Image style={styles.logo} source={require('../Images/logo.png')}/>
          <View style={styles.info_container}>
            <View style={styles.input_container}>
              <Icon name='mail' style={styles.icon}/>
              <TextInput style={styles.input} placeholder='Adresse mail'></TextInput>
            </View>
            <View style={styles.input_container}>
              <Icon name='key' style={styles.icon}/>
              <TextInput style={styles.input} placeholder='Mot de passe'></TextInput>
            </View>
            <View style={styles.input_container}>
              <Icon name='key' style={styles.icon}/>
              <TextInput style={styles.input} placeholder='Confirmer mot de passe'></TextInput>
            </View>
            <View style={styles.button_container}>
              <View style={styles.button}>
                <Button title="Annuler" onPress={() => goBackPage()} color="#ff0000"/>
              </View>
              <View style={styles.button}>
              <Button title="Valider" onPress={() => checkRegistration()} color="#009933"/>
              </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center'
  },
  logo: {
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  input_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  icon: {
    marginRight: 10,
    marginLeft: 'auto',
  },
  input:{
    height: 40,
    width: 300,
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,
    fontSize: 20,
  },
  button_container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    flex: 1,
  },
});