import React, { Component } from 'react';

// import { Container } from './styles';
import './Timeline.css'
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';



export default class Timeline extends Component {

    state = {
        tweets:[],
        newTweet :"",
       
    };

    async componentDidMount(){ //Executa automaticamente quando a pagina é exibida
        const response = await api.get('tweets');
        this.setState({ tweets: response.data })

        this.subscribToEvents();

    }

    subscribToEvents = () => {

        const io = socket('http://10.0.20.200:3000');

        //Eventos monitorados
        io.on('tweet', data => {

            //Copiando todos os tweets depois do novo ... significa spread operator
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

    handleInputChange = (e) => {

        this.setState({newTweet : e.target.value});

    };

    handleNewTweet = async (e) => {
            if(e.keyCode !== 13) return;

            const content = this.state.newTweet;
            const author = localStorage.getItem('@GoTwitter:username');

            await api.post('tweets',{content, author});

            this.setState({ newTweet:''}) //Reiniciando o valor do tweet

    };

  render() {
    return (
        <div className="timeline-wrapper">
        <img heigth={24} src={twitterLogo} alt="GoTwitter" />
        <form>
            <textarea
                value={this.state.newTweet}
                onChange={this.handleInputChange}
                onKeyDown={this.handleNewTweet}
                placeholder="O que esta acontecendo"
                ></textarea>
        </form>
            <ul className="tweet-list">
            { this.state.tweets.map(tweet => (
                //O id é necessario pra saber que cada componente é unico
                <Tweet key={tweet._id} tweet={tweet}></Tweet>

            ))}
        </ul>
        </div>


    );
  }
}
