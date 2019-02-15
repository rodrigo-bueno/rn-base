import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Timeline  from './pages/Timeline';


//Compoentene extende a classe padrão component

class App extends Component {
  render() {//Qual conteudo ele vai renderizar
    //O Switch garante que apenas uma rota seja chamada
    // Exact garante que a rota é aquela definida
    return (
      <BrowserRouter>
      
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
