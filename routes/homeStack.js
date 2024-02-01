import { createStackNavigator} from 'react-navigation-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import home from '../screens/home.js';
import eventoSingolo from '../screens/eventoPersonaleSingolo.js';

const screens = {
    home: {
        screen: home,
    },
    eventoSingolo: {
        screen: eventoSingolo,
        navigationOptions: {
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(HomeStack);