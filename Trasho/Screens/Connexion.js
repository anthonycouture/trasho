import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Text, Button, Icon } from 'native-base';
import {
  StackNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Toast from 'react-native-simple-toast';
import { Font, AppLoading } from 'expo';
import GLOBAL from '../Globals';
import Globals from '../Globals';

class Connexion extends Component {

  state = {
    email: '',
    password: '',
    isEmail: false,
    showPassword: false,
    icon: "eye-off",
    connected: false
  }

  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async componentDidMount() {
    
  }

  handleEmail = (text) => {
    this.setState({ email: text, isEmail: this.regex.test(text) })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }

  login = (email, pass) => {
    //alert('email: ' + email + ' password: ' + pass);
    let emailOk = false;
    let passOk = false;

    if (email && pass) {
      emailOk = this.checkEmailButtonTyped();
      passOk = this.checkPasswordButtonTyped();
      if (emailOk && passOk) {
        this.connexion();
      }
    }
    else {
      Toast.show('Veuillez remplir les champs', Toast.LONG);
    }
  }

  navigatePageInscription() {
    this.props.navigation.navigate('Inscription');
  }

  navigatPageMonCompte() {
    this.props.navigation.navigate('MonCompte');
  }

  checkEmailButtonTyped() {
    if (!this.regex.test(this.state.email)) {
      Toast.show('Email invalide', Toast.LONG);
    }
    else {
      return true;
    }
  }

  checkPasswordButtonTyped() {
    if (this.state.password.length < 1) {
      Toast.show('Mot de passe indéfini', Toast.LONG);
    }
    else {
      return true;
    }
  }

  _changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      showPassword: !prevState.showPassword
    }));
  }

  _storeData = async (res) => {
    try {
      let adm = 'false';
      await AsyncStorage.setItem('EMAIL', this.state.email);
      const admin = res['user'][this.state.email]['flag_admin'];
      if (admin == true) {
        adm = 'true';
      }
      await AsyncStorage.setItem('ADMIN', adm);
      await AsyncStorage.setItem('CONNECTED', 'true');
    } catch (error) {
      // Error saving data
    }
  };

  async connexion() {
    const url = GLOBAL.BASE_URL + '/api/user/connexion';
    const body = 'mail=' + this.state.email + '&password=' + this.state.password;
    /*const response = await fetch(url).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    */
  const response = await fetch(url, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: body
});
    if (response.status != 200) {
      alert('Combinaison email et mot de passe invalide');
    }
    else if (response.status == 200) {
      const res = await response.json();
      await this._storeData(res);
      this.setState({ connected: res.resp });
      Globals.connected = true
      Globals.admin = res['user'][this.state.email]['flag_admin'];
      Globals.email = this.state.email;
      alert('Connexion réussie !');
      this.navigatPageMonCompte();
    }
  }

  render() {
    return (
      <Container>
        <Image
          source={require('../Images/logo.png')}
          style={styles.logo}
        />

        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Form>
            <Text style={styles.text}> Adresse email : </Text>
            <Item style={{ borderColor: 'transparent' }}>
              <Icon name="mail" />
              <Item error={!this.state.isEmail} success={this.state.isEmail} style={{ marginRight: 50 }}>
                <Input placeholder="Email" onChangeText={this.handleEmail} />
                <Icon name='checkmark-circle' />
              </Item>
            </Item>
            <Text style={styles.text}> Mot de passe : </Text>
            <Item style={{ borderColor: 'transparent' }}>
              <Icon name="key" />
              <Item style={{ marginRight: 50, }}>
                <Input placeholder="Mot de passe" secureTextEntry={!this.state.showPassword} onChangeText={this.handlePassword} />
                <Icon name={this.state.icon} onPress={() => this._changeIcon()} />
              </Item>
            </Item>

            <Button rounded block style={[styles.submitButton, styles.buttonWidth]}
              onPress={
                () => this.login(this.state.email, this.state.password)
              }>
              <Text style={styles.submitButtonText}> Connexion </Text>
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
  buttonWidth: {
    marginLeft: 15,
    marginRight: 15
  },
  submitButtonText: {
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
});
