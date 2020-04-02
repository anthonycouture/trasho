import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Toast from 'react-native-simple-toast';

class Connexion extends Component {

  state = {
      email: '',
      password: ''
  }
  
  handleEmail = (text) => {
      this.setState({ email: text })
  }

  handlePassword = (text) => {
      this.setState({ password: text })
  }

  login = (email, pass) => {
      //alert('email: ' + email + ' password: ' + pass)
      this.checkEmail();
      this.checkPassword();
  }

  navigatePageInscription() {
    this.props.navigation.navigate('Screen3');
    
  }

  checkEmail() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.state.email)) {
      Toast.show('Email invalide', Toast.LONG);
    }
  }

  checkPassword() {
    if(this.state.password.length < 1) {
      Toast.show('Mot de passe indéfini', Toast.LONG);
    }
  }

  render() {
      return (
        <View style = {styles.container}>
          <Image
            source={require('../Images/logo.png')}
            style={ styles.logo }
          />

          <Text style={ styles.text }> Adresse email : </Text>

          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Email"
            placeholderTextColor = "#000000"
            autoCapitalize = "none"
            onChangeText = {this.handleEmail}
          />

          <Text style={ styles.text }> Mot de passe : </Text>

          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "#000000"
            autoCapitalize = "none"
            onChangeText = {this.handlePassword}
          />
              
          <TouchableOpacity
            style = { styles.submitButton }
            onPress = {
                () => this.login(this.state.email, this.state.password)
          }>
            <Text style = { styles.submitButtonText }> Connexion </Text>
          </TouchableOpacity>
                
            <View style = { styles.inscription } >
              <Button color="#74992e" title="Inscription" onPress={() => this.navigatePageInscription() }/>
            </View>
        </View>
      )
  }
}
export default Connexion
  


const styles = StyleSheet.create({
  container: {
      paddingTop: 23
  },
  input: {
      marginRight: 15,
      marginLeft: 15,
      height: 40,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 10,
      marginTop: 20
  },
  submitButton: {
      backgroundColor: '#000000',
      padding: 10,
      marginTop: 40,
      marginLeft: 15,
      marginRight: 15,
      height: 40,
      marginBottom: 30
  },
  submitButtonText:{
      color: 'white',
      textAlign: 'center'
  },
  text: {
    fontSize: 23,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15
  },
  logo: {
    width: 250,
    height: 250,
    marginLeft: 10,
    marginTop: 3,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  inscription: {
    marginRight: 15,
    marginLeft: 15
  }
})