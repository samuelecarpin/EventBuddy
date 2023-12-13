import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import home from '../screens/home.js';
import login from '../screens/login.js';
import eventoSingolo from '../screens/eventoSingolo';
import creaEvento from '../screens/creaEvento';
import navigation from '../screens/navigation.js'

const screens = {
    navigation: {
        screen: navigation
    },
    home: {
        screen: home
    },
    login: {
        screen: login
    },
    eventoSingolo: {
        screen: eventoSingolo
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