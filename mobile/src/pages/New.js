import React, { Component } from 'react';

import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api'
// import styles from './styles';


export default class pages extends Component {

    state = { newTweet : ''}
    
    static navigationOptions = {
        header: null
    }

    goBack = () =>{
        this.props.navigation.pop(); //Volta para a ultima rota que ele acessou
    }

    handleTweet = async () =>{
            const content = this.state.newTweet
            const author = await AsyncStorage.getItem('@OmniStack:username')
            await api.post("tweets",{ author, content});
            this.goBack();
        
    }

    handleInputChange = () =>{
        this.setState({ newTweet })

    }


  render() {
    return (
        //Controla a area visivel do conteudo Safe Area View
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={this.goBack}>
                    <Icon name="close" size={24} color="#4BB0EE"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>{}}>
                    <Text style={styles.buttonText}>Tweetar</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.input}
            multiline
            placeholder="O que esta acontecendo?"
            placeholderTextColor="#999"
            value={this.state.newTweet}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleTweet}
            ></TextInput>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },

    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },

    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },

    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },

    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
});
