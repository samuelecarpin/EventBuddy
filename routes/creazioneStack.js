import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import paginaCrea from '../screens/paginaCrea';
import creaEvento from '../screens/creaEvento';
import login from '../screens/login';

const screens = {
    paginaCrea: {
        screen: paginaCrea,
    },
    creaEvento: {
        screen: creaEvento
    },
    login: {
        screen: login
    }
}

const HomeStack = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(HomeStack);