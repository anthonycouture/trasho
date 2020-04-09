import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

export default class Inscription extends Component {

  state = {
    loading: true,
    email: '',
    password: '',
    confirmPassword: '',
    iconPassword: 'eye-off',
    hidePassword: true,
    iconConfirmPassword: 'eye-off',
    hideConfirmPassword: true,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading: false })
  }

  _handleEmail = (text) => {
    this.setState({ email: text })
  }

  _handlePassword = (text) => {
    this.setState({ password: text })
  }

  _handleConfirmPassword = (text) => {
    this.setState({ confirmPassword: text })
  }

  _checkEmail() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.state.email)) {
      Toast.show('Email invalide', Toast.LONG);
      return false;
    }
    return true;
  }

  _checkPassword() {
    if(this.state.password.length < 1) {
      Toast.show('Mot de passe indéfini', Toast.LONG);
      return false;
    }
    var regex = /^((?=.*[A-Z])(?=.*[a-z])(?=.*\d))$/;
    if(!regex.test(this.state.password)){
      Toast.show('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.', Toast.LONG);
    }
    return true;
  }

  _checkConfirmPassword(){
    if(this.state.confirmPassword.length < 1) {
      Toast.show('Confirmation du mot de passe indéfinie', Toast.LONG);
      return false;
    }
    if(this.state.password != this.state.confirmPassword){
      Toast.show('Les deux mots de passe ne correspondent pas', Toast.LONG);
      return false;
    }
    return true;
  }

  _changeViewPassword(){
    if(this.state.hidePassword){
      this.setState({ iconPassword: 'eye', hidePassword: false});
    } else {
      this.setState({ iconPassword: 'eye-off', hidePassword: true});
    }
  }

  _changeViewConfirmPassword(){
    if(this.state.hideConfirmPassword){
      this.setState({ iconConfirmPassword: 'eye', hideConfirmPassword: false});
    } else {
      this.setState({ iconConfirmPassword: 'eye-off', hideConfirmPassword: true});
    }
  }

  _goBackPage(){
    console.log("Go Back");    
  }

  _checkRegistration(){
    console.log(this._checkEmail()
      && this._checkPassword() 
      && this._checkConfirmPassword() 
    );    
  }

  render() {
    if(this.state.loading){
      <View></View>
    }
    return (
      <Container>
        <Content>
          <Image 
            style={styles.logo} 
            source={require('../Images/logo.png')}
          />
          <Form>
            <Item>
              <Icon name="mail"/>
              <Input 
                placeholder="Adresse mail"
                onChangeText={this._handleEmail}
              />
            </Item>
            <Item>
              <Icon name="key"/>
              <Input 
                placeholder="Mot de passe" 
                secureTextEntry={this.state.hidePassword}
                onChangeText={this._handlePassword}
              />
              <Icon
                name={this.state.iconPassword}
                onPress={() => this._changeViewPassword()}
              />
            </Item>
            <Item last>
              <Icon name="key"/>
              <Input 
                placeholder="Confirmer mot de passe" 
                secureTextEntry={this.state.hideConfirmPassword}
                onChangeText={this._handleConfirmPassword}
              />
              <Icon
                name={this.state.iconConfirmPassword}
                onPress={() => this._changeViewConfirmPassword()}
              />
            </Item>
          </Form>
              <Button block success>
                <Text>S'inscrire</Text>
              </Button>
        </Content>
      </Container>
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