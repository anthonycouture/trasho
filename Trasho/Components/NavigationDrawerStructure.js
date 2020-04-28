import React, { Component } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Connexion from '../Screens/Connexion';
import Itineraire from '../Screens/Itineraire';
import MonCompte from '../Screens/MonCompte';
import AjouterPoubelle from '../Screens/AjouterPoubelle';
import Admin from '../Screens/Admin';
import Map from '../Screens/Map';
import Inscription from '../Screens/Inscription';
import ListeUtilisateurs from '../Screens/ListeUtilisateurs';
import Utilisateur from '../Screens/Utilisateur';
import Statistiques from '../Screens/Statistiques';
import CustomSideMenu from './CustomSideMenu';
import { Icon } from 'native-base';
import Globals from '../Globals';

class NavigationDrawerStructure extends Component {

    state = {
        reload: false
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf'),
        });
        await this._retrieveData();
        //await AsyncStorage.clear();
    }

    _retrieveData = async () => {
        try {
            const admin = await AsyncStorage.getItem('ADMIN');
            const connected = await AsyncStorage.getItem('CONNECTED');

            if (admin !== null) {
                Globals.admin = admin;
            }

            if (connected !== null) {
                Globals.connected = connected;
            }
        } catch (error) {
            console.log(error)
        }
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            reload: !prevState.reload
        }));
        this.props.navigationProps.toggleDrawer();
    };

    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <Image
                        source={require('../Images/drawer.png')}
                        style={{ width: 30, height: 25, marginLeft: 10, marginTop: 0 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const DrawerNavigator = createDrawerNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            drawerLabel: 'Map',
        },
    },
    Connexion: {
        screen: Connexion,
        navigationOptions: {
            drawerLabel: 'Connexion',
        },
    },
    Inscription: {
        screen: Inscription,
        navigationOptions: {
            drawerLabel: 'Inscription'
        },
    },
    Itineraire: {
        screen: Itineraire,
        navigationOptions: {
            drawerLabel: 'Itineraire'
        }
    },
    MonCompte: {
        screen: MonCompte,
        navigationOptions: {
            drawerLabel: 'Mon compte'
        }
    },
    AjouterPoubelle: {
        screen: AjouterPoubelle,
        navigationOptions: {
            drawerLabel: 'Ajouter poubelle'
        }
    },
    Admin: {
        screen: Admin,
        navigationOptions: {
            drawerLabel: 'Admin'
        }
    },
    ListeUtilisateurs: {
        screen: ListeUtilisateurs,
        navigationOptions: {
            drawerLabel: 'ListeUtilisateurs'
        }
    },
    Utilisateur: {
        screen: Utilisateur,
        navigationOptions: {
            drawerLabel: 'Utilisateur'
        }
    },
    Statistiques: {
        screen: Statistiques,
        navigationOptions: {
            drawerLabel: 'Statistiques'
        }
    }
},
    {
        contentComponent: CustomSideMenu,
        contentOptions: {
            activeTintColor: 'green'
        }
    }
);

const StackNavigator = createStackNavigator({
    DrawerNavigator:{
        screen: DrawerNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'Map',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    }
});

export default createAppContainer(StackNavigator);