import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Text, Button, Icon } from 'native-base';
import {
  StackNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Toast from 'react-native-simple-toast';
import { Font , AppLoading} from 'expo';

class Connexion extends Component {

  state = {
      email: '',
      password: '',
      isEmail: false
  }

  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  handleEmail = (text) => {
      this.setState({ email: text })
      this.checkEmail();
  }

  handlePassword = (text) => {
      this.setState({ password: text })
  }

  login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
      this.checkEmailButtonTyped();
      this.checkPasswordButtonTyped();
  }

  navigatePageInscription() {
    this.props.navigation.navigate('Screen3');
    
  }

  checkEmailButtonTyped() {
    if(!this.regex.test(this.state.email)) {
      Toast.show('Email invalide', Toast.LONG);
    }
  }

  checkEmail() {
    this.state.isEmail = this.regex.test(this.state.email);
  }

  checkPasswordButtonTyped() {
    if(this.state.password.length < 1) {
      Toast.show('Mot de passe indéfini', Toast.LONG);
    }
  }

  render() {
      return (

          <Container>
            <Image
            source={require('../Images/logo.png')}
            style={ styles.logo }
          />

        <Content>
          <Form>
          <Text style={ styles.text }> Adresse email : </Text>
            <Item error={!this.state.isEmail} success={this.state.isEmail}>
              <Input placeholder="Email" onChangeText={this.handleEmail}/>
              <Icon name='checkmark-circle' />
            </Item>
            <Text style={ styles.text }> Mot de passe : </Text>
            <Item>
              <Input placeholder="Mot de passe" secureTextEntry={true} onChangeText={this.handlePassword}/>
            </Item>

        <Button rounded block style={[styles.submitButton, styles.buttonWidth]}
            onPress = {
                () => this.login(this.state.email, this.state.password)
          }>
            <Text style = { styles.submitButtonText }> Connexion </Text>
          </Button>


            <Button dark rounded block style={[styles.buttonWidth]}
              onPress={
                () => this.navigatePageInscription()
          }>
              <Text>Inscription</Text>
            </Button>
          </Form>
        </Content>

      </Container>
                
            

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
      borderWidth: 1,
      paddingLeft: 10,
      marginTop: 20
  },
  submitButton: {
      backgroundColor: '#74992e',
      padding: 10,
      marginTop: 40,
      height: 40,
      marginBottom: 30
  },
  buttonWidth:{
    marginLeft: 15,
    marginRight: 15
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
  }
})