import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { Root } from "native-base";

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
    isEmail: false
  }

  regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  _handleEmail = (text) => {
    this.setState({ email: text, isEmail: this.regexEmail.test(text) });
  }

  _handlePassword = (text) => {
    this.setState({ password: text })
  }

  _handleConfirmPassword = (text) => {
    this.setState({ confirmPassword: text })
  }

  _checkEmail() {
    if(!this.regexEmail.test(this.state.email)) {
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
    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,50}$/;
    if(this.state.password.length<6){
      Toast.show('Le mot de passe doit contenir au moins 6 caractères.', Toast.LONG);
      return false;
    } else if(this.state.password.length>50){
      Toast.show('Le mot de passe doit contenir au maximim 50 caractères.', Toast.LONG);
      return false;
    }     
    else if(!regexPassword.test(this.state.password)){
      Toast.show('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.', Toast.LONG);
      return false;
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
    if(this._checkEmail()
      && this._checkPassword() 
      && this._checkConfirmPassword() 
    ){
      this.props.navigation.navigate('CGU', {mail : this.state.email, password : this.state.password})  
    }
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
            <Item style={{ borderColor: 'transparent' }}>
              <Icon name="mail"/>
              <Item error={!this.state.isEmail} success={this.state.isEmail} style={{ marginRight: 40, }}>
                <Input 
                  placeholder="Adresse mail"
                  onChangeText={this._handleEmail}
                  autoCapitalize="none"
                />
                <Icon name='checkmark-circle' />
              </Item>
            </Item>
            <Item style={{ borderColor: 'transparent' }}>
              <Icon name="key"/>
              <Item style={{ marginRight: 40, }}>
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
            </Item>
            <Item style={{ borderColor: 'transparent' }}>
              <Icon name="key"/>
              <Item style={{ marginRight: 40, }}>
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
            </Item>
          </Form>
            <Button rounded block style={styles.button} onPress={() => this._checkRegistration()}>
              <Text>S'inscrire</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#74992e',
    padding: 10,
    marginTop: 40,
    height: 40,
    marginBottom: 30
  },
});
