import React, { Component } from 'react';
import './Login.css';
import twitterLogo from '../twitter.svg';

// import { Container } from './styles';

export default class Login extends Component {
    //Reconhecida automaticamente pelo component toda vez qye a informação é alterada ele altera o state
    // One way data binding
    state = {
        username : "",

    };

    handleSubmit = e => {

        e.preventDefault(); // no evento onsubmit do form ele evita o evento padrão.
        const { username } = this.state;
        if(!username.length)  return;
        console.log(username);    
        localStorage.setItem('@GoTwitter:username',username);

        //react router dom acessa essa propriedade
        this.props.history.push('/timeline');
    };


    //To funcao que não padrao do react criar no arrwo funcion para que o this sempre faça referencia a classe
    handleInputChange = (e) => {
        // e.target.value pega o evento do elemnt
        this.setState({username: e.target.value })

    };

    

  render() {
    return (
        <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter"/>
        <form onSubmit={this.handleSubmit}>
            <input 
            placeholder="Nome de usuário"
            onChange={this.handleInputChange}
            value={this.state.username}
            />
            <button type="submit">Entrar</button>
        </form>
        </div>
        
        );
  }
}
