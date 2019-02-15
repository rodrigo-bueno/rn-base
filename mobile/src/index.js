import React from 'react';

// import { Container } from './styles';

import Routes  from './routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized Websock']); //Ignora os avisos amarelos da aplicação


const App = () => <Routes />;

export default App;

//Componente que nao possui extado