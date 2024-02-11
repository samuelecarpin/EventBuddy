import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import locali from '../screens/locali.js';
import creaEvento from '../screens/creaEvento';
import accountInterface from '../screens/accountInterface.js';

const screens = {
    locali: {
        screen: locali
    },
    creaEvento: {
        screen: creaEvento
    },
    accountInterface: {
        screen: accountInterface
    }
}

const HomeStack = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(HomeStack);