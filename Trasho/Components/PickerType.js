import React, { Component } from "react";
import { View, Picker, Button, Icon } from "native-base";
import { StyleSheet } from 'react-native';

export default class PickerType extends Component{

    constructor(props){
        super(props);
        const allTypes = [];
        this.props.typeList.forEach(element => {
            allTypes.push(element.type);
        });
        this.state = {
            canDelete : this.props.canDelete,
            typeList : allTypes,
            selected : 'Tout déchet',
        }
    }

    onValueChange = (value) => {
        this.setState({
            selected: value
        });
    }

    render(){
        return(
        <View style={styles.view_picker}>
            <Picker
                note
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange}
                style={styles.picker}
            >
                {
                    this.state.typeList.map((type) => {
                        console.log(type);
                        return(
                            <Picker.Item label={type} value={type} />
                        )
                    })
                }
            </Picker>
            {
                this.state.canDelete &&
                <Button danger block style={styles.button}>
                    <Icon type="FontAwesome" name="remove"/>
                </Button>
            }
        </View>
        );
    }
}

const styles = StyleSheet.create({
    view_picker : {
        flexDirection: 'row',
    },
    picker:{
        flex: 1,
    },
    button:{
        flex: 0.2,
        margin: 5
    }
});