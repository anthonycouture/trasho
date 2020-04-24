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

const map_StackNavigator = createStackNavigator({
    First: {
        screen: Map,
        navigationOptions: ({ navigation }) => ({
            title: 'Map',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});

const Connexion_StackNavigator = createStackNavigator({
    Second: {
        screen: Connexion,
        navigationOptions: ({ navigation }) => ({
            title: 'Connexion',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});

const inscription_StackNavigator = createStackNavigator({
    Third: {
        screen: Inscription,
        navigationOptions: ({ navigation }) => ({
            title: 'Inscription',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});

const itineraire_StackNavigator = createStackNavigator({
    Third: {
        screen: Itineraire,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon:
                <Icon name="ios-bookmarks" size={20} />
            ,
            title: 'Itineraire',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});

const monCompte_StackNavigator = createStackNavigator({
    Third: {
        screen: MonCompte,
        navigationOptions: ({ navigation }) => ({
            title: 'Mon compte',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});

const ajouterPoubelle_StackNavigator = createStackNavigator({
    Third: {
        screen: AjouterPoubelle,
        navigationOptions: ({ navigation }) => ({
            title: 'Ajouter poubelle',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});

const admin_StackNavigator = createStackNavigator({
    Third: {
        screen: Admin,
        navigationOptions: ({ navigation }) => ({
            title: 'Admin',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#74992e',
            },
            headerTintColor: '#fff',
        }),
    },
});


const DrawerNavigator = createDrawerNavigator({
    Map: {
        screen: map_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Map',
        },
    },
    Connexion: {
        screen: Connexion_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Connexion',
        },
    },
    Inscription: {
        screen: inscription_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Inscription'
        },
    },
    Itineraire: {
        screen: itineraire_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Itineraire'
        }
    },
    MonCompte: {
        screen: monCompte_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Mon compte'
        }
    },
    AjouterPoubelle: {
        screen: ajouterPoubelle_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Ajouter poubelle'
        }
    },
    Admin: {
        screen: admin_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Admin'
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

export default createAppContainer(DrawerNavigator);
