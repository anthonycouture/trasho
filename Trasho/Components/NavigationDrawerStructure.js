import React, { Component } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Connexion from '../Screens/Connexion';
import Screen3 from '../Screens/Screen3';
import Itineraire from '../Screens/Itineraire';
import MonCompte from '../Screens/MonCompte';
import AjouterPoubelle from '../Screens/AjouterPoubelle';
import Admin from '../Screens/Admin';
import Map from '../Screens/Map';
import Inscription from '../Screens/Inscription';
import { Icon } from 'native-base';


class NavigationDrawerStructure extends Component {

    async componentDidMount() {
        await Expo.Font.loadAsync({
            'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf'),
        });
    }

    toggleDrawer = () => {
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

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../Images/logo.png')} style={{ height: 120, width: 120, marginTop: 50 }} />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

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

const Screen2_StackNavigator = createStackNavigator({
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

const Screen3_StackNavigator = createStackNavigator({
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
        screen: Screen2_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Connexion',
        },
    },
    Screen3: {
        screen: Screen3_StackNavigator,
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
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            activeTintColor: 'green'
        }
    }
);

export default createAppContainer(DrawerNavigator);
