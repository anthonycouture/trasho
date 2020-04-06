    import React, { Component } from 'react';
    import { View, Image, TouchableOpacity } from 'react-native';
    import {createAppContainer} from 'react-navigation';
    import {createDrawerNavigator} from 'react-navigation-drawer';
    import {createStackNavigator} from 'react-navigation-stack';
    import Connexion from '../Screens/Connexion';
    import Screen3 from '../Screens/Screen3';
    import Itineraire from '../Screens/Itineraire';
    import MonCompte from '../Screens/MonCompte';
    import Map from '../Screens/Map';
    import { Font , AppLoading} from 'expo';


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
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Image
                source={require('../Images/drawer.png')}
                style={{ width: 30, height: 25, marginLeft: 10, marginTop: 3 }}
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
            screen: Screen3,
            navigationOptions: ({ navigation }) => ({
                title: 'Screen 3',
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
                title: 'Screen 3',
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

    const DrawerNavigator = createDrawerNavigator({
        Screen1: {
            screen: map_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Map',
            },
        },
        Screen2: {
            screen: Screen2_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Connexion',
            },
        },
        Screen3: {
            screen: Screen3_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Screen 3',
            },
        },
        Screen4: {
            screen: itineraire_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Itineraire'
            }
        },
        Screen5: {
            screen: monCompte_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Mon compte'
            }
        }
    });

    export default createAppContainer(DrawerNavigator);