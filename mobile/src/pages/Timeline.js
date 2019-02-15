import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import Tweet from '../components/Tweet'
import scoket from 'socket.io-client';

export default class Timeline extends Component {
  //Aplica configurações ao header da pagina
  static navigationOptions = ({navigation}) => ({ //O parentes força o retorno de um obejto
    title: "Inicio",
    headerRight:(
      <TouchableOpacity  onPress={() => navigation.navigate("New")}>
        <Icon style={{marginRight: 20}}
        name="add-circle-outline"
        size={24}
        color="#4BB0EE"
        />
      </TouchableOpacity>
    )
  });

  state = {
    tweets:[]
  };
  async componentDidMount(){
    this.subscribToEvents();
      const response = await api.get('tweets');
      console.log(response);

      this.setState({tweets: response.data});

  };

  subscribToEvents = () => {

    const io = socket('http://10.0.20.200:3000');

    //Eventos monitorados
    io.on('tweet', data => {

        //Copiando todos os tweets depois do novo ... significa spread operator os tres pontos
        this.setState({ tweets: [data, ...this.state.tweets]})
        console.log(data);
    });
   
    io.on('like', data => {
        this.setState({ tweets : this.state.tweets.map( tweet => (
                tweet._id == data._id ? data : tweet //Vai percorer o array ae atualizar o contador do tweet
        ))}) 

        console.log(data);
    });
   

}

  render() {
    return (<View style={styles.container}>
    
      <FlatList data={this.state.tweets}
      keyExtractor={tweet => tweet._id} //Extrai o id do array
      renderItem={({item}) => 
        <Tweet tweet={item}></Tweet>
    }/>
    
    </View>);
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
});
