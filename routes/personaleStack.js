import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import creaAnnuncio from '../screens/cercaAnnuncio.js';
import categoriaAnnuncio from '../screens/categoriaAnnuncio.js';

const screens = {
    creaAnnuncio: {
        screen: creaAnnuncio
    },
    categoriaAnnuncio: {
        screen: categoriaAnnuncio
    },
    creaAnnuncio: {
        screen: creaAnnuncio
    },

}

const Annuncio = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(Annuncio);