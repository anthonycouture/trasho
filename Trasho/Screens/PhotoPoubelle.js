import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions  } from 'react-native';
import { View, Text, Icon } from 'native-base';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ThemeColors } from 'react-navigation';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class PhotoPoubelle extends React.Component{

    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        photo: null,
        picker: false
    }
    
    componentDidMount(){
        this._checkPermission();
    }

    componentDidUpdate(){
        this._checkPermission();
    }

    componentWillUnmount(){
        this.state = {}
    }

    /**
     * Ask permission to use the camera
     */
    async _checkPermission(){
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({
            hasPermission: (status === 'granted')
        });
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }

    /**
     * Switch the camera between front and back
     */
    _setType(){
        this.state.type === Camera.Constants.Type.back
            ? this.setState({ type : Camera.Constants.Type.front })
            : this.setState({ type : Camera.Constants.Type.back })
    }

    async _takePicture(){
        if (this.camera) {
            await this.camera.takePictureAsync({
                quality : 0.5,
                base64: true
            }).then((currentPhoto) => {
                this.setState({
                    photo: currentPhoto,
                    picker: false,
                });
            });
        }
    }

    async _pickPicture(){
        try {
            await ImagePicker.launchImageLibraryAsync({
                quality: 1,
                base64: true
            }).then((result) => {
                console.log(result.cancelled);
                if (result.cancelled) {                   
                    this.setState({ photo: null });
                } else {
                    console.log(Object.keys(result));
                    console.log(result.base64.substring(0,10));
                    this.setState({ 
                        photo: result.base64,
                        picker: true
                    });
                }
            });
        } catch (E) {
            console.log(E);
        }
    }

    _validPhoto(){

    }
    
    render(){
        if (this.state.hasPermission === null) {
            return <Text>No permission asked</Text>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }        
        return(
            <View style={{ flex: 1 }}>
                {//no photo -> camera
                    !this.state.photo && (
                        <Camera 
                            style={{ flex: 1 }} 
                            type={this.state.type}
                            ref={ref => {
                                this.camera = ref;
                            }}
                        >
                            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                                <TouchableOpacity
                                    style={styles.cameraButtons}
                                    onPress={() => this._pickPicture()}
                                >
                                    <Icon
                                        type="Ionicons"
                                        name="ios-photos"
                                        style={styles.cameraIcons}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cameraButtons}
                                    onPress={() => this._takePicture()}
                                >
                                    <Icon
                                        type="FontAwesome"
                                        name="camera"
                                        style={styles.cameraIcons}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cameraButtons}
                                    onPress={() => this._setType()}
                                >
                                    <Icon
                                        type="MaterialCommunityIcons"
                                        name="camera-switch"
                                        style={styles.cameraIcons}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    )
                }
                {//photo -> display photo                   
                    this.state.photo && (
                        <View style={{ flex: 1 }}>
                            {!this.state.picker&&(
                                <Image style={styles.photo} source={this.state.photo} /> 
                            )}
                            {this.state.picker&&(
                                <Image style={styles.photo} source={{ uri : 'data:image/png;base64,'+this.state.photo}} /> 
                            )}
                            <View style={styles.validOrCancelPhoto}>
                                <TouchableOpacity
                                    style={styles.cameraButtons}
                                    onPress={() => {
                                        this.setState({
                                            photo: null
                                        })
                                    }}
                                >
                                    <Icon
                                        type="FontAwesome"
                                        name="remove"
                                        style={styles.cameraIcons}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cameraButtons}
                                    onPress={() => this._validPhoto()}
                                >
                                    <Icon
                                        type="FontAwesome"
                                        name="check"
                                        style={styles.cameraIcons}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerView : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    cameraButtons : {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    cameraIcons : {
        color: "#fff", 
        fontSize: 40
    },
    photo: {
        width: screenWidth, 
        flex: 1,
        resizeMode: 'cover'
    },
    validOrCancelPhoto: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"row",
        justifyContent:"space-between",
        margin:20
    }
    
})