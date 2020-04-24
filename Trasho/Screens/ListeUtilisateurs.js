import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button, Icon } from 'native-base';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class ListeUtilisateurs extends Component {

    state = {
        dialogVisible: false
    }

    changeDialogState() {
        this.setState(prevState => ({
            dialogVisible: !prevState.dialogVisible
        }));
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                        <Button transparent
                                onPress={
                                    () => this.props.navigation.navigate('Utilisateur')
                                }>
                                <Icon name={'person'} style={styles.black} />
                                <Text style={styles.black}>Nathaniel Clyne</Text>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Text>Nathaniel Clyne</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                    </List>
                    <ConfirmDialog
                        title="Confirmation"
                        message="Voulez-vous vraiment vous déconnecter ?"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({ dialogVisible: false })}
                        positiveButton={{
                            title: "Oui",
                            onPress: () => { this.changeDialogState() }
                        }}
                        negativeButton={{
                            title: "Non",
                            onPress: () => { this.changeDialogState() }
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    black: {
        color: 'black'
    }
});