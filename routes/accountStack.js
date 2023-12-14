import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import account from '../screens/account.js';
import eventoSingolo from '../screens/eventoSingolo.js';

const screens = {
    account: {
        screen: account
    },
    /*informazioniPersonali: {
        screen: informazioniPersonali
    },
    linkSocial: {
        screen: linkSocial
    },
    eventiVisitati: {
        screen: eventiVisitati
    },
    personaleAssunto: {
        screen: personaleAssunto
    },
    eventiCreati: {
        screen: eventiCreati
    },
    localiPersonali: {
        screen: localiPersonali
    },
    resetPassword: {
        screen: resetPassword
    },
    eliminaAccount: {
        screen: eliminaAccount
    },*/



}

const AccountStack = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(AccountStack);