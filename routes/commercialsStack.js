import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import locali from '../screens/locali.js';
import creaEvento from '../screens/creaEvento';

const screens = {
    locali: {
        screen: locali
    },
    creaEvento: {
        screen: creaEvento
    },
}

const HomeStack = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(HomeStack);