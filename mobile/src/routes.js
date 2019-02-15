import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';

// Função necessaria para as rotdas da aplicação
// createSwitchNavigator Navegação sem nenhum efeito visual qunado navegar para a proxima pagina ão é possivle voltar para a nterior
const Routes = createAppContainer(
    createSwitchNavigator({
    Login,
    App : createStackNavigator({
            Timeline,
            New
            })
        })
    ); 

export default Routes;