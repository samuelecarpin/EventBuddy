import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { CardStyleInterpolators } from '@react-navigation/stack';
import account from '../screens/account.js';
import eventoPersonaleSingolo from '../screens/eventoPersonaleSingolo.js';
import eventiVisitati from '../screens/eventiVisitati.js';
import eventiCreati from '../screens/eventiCreati.js'
import login from '../screens/login.js';
import informazioniPersonali from '../screens/infoPersonali.js';
import registrazione from '../screens/registrazione.js';
import confermaRegistrazione from '../screens/confermaRegistrazione.js';
import modificaEvento from '../screens/modificaEvento.js';
import duplicaEvento from '../screens/duplicaEvento.js';
import waitingPage from '../screens/waitingPage.js';
import linkSocial from '../screens/linkSocial.js';
import eventiInteressanti from '../screens/eventiInteressanti.js';
import eliminaAccount from '../screens/eliminaAccount.js';
import resetPassword from '../screens/resetPassword.js'
import resetPasswordContinua from '../screens/resetPasswordContinua.js'
import accountInterface from '../screens/accountInterface.js';
import accountInterfacePersonal from '../screens/accountInterfacePersonal.js'

const screens = {
    waitingPage: {
        screen: waitingPage
    },
    login: {
        screen: login,
        navigationOptions: {
            gestureEnabled: false,
        }
    },
    accountInterfacePersonal: {
        screen: accountInterfacePersonal,
        navigationOptions: {
            gestureEnabled: false,
        }
    },
    accountInterface: {
        screen: accountInterface,
    },
    account: {
        screen: account,
    },
    registrazione: {
        screen: registrazione
    },
    confermaRegistrazione: {
        screen: confermaRegistrazione
    },
    informazioniPersonali: {
        screen: informazioniPersonali
    },
    linkSocial: {
        screen: linkSocial
    },
    eventiVisitati: {
        screen: eventiVisitati,
    },
    eventiCreati: {
        screen: eventiCreati,
    },
    resetPassword: {
        screen: resetPassword
    },
    eliminaAccount: {
        screen: eliminaAccount
    },
    eventoPersonaleSingolo: {
        screen: eventoPersonaleSingolo,
        navigationOptions: {
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }
    },
    eventiInteressanti: {
        screen: eventiInteressanti
    },
    modificaEvento: {
        screen: modificaEvento
    },
    duplicaEvento: {
        screen: duplicaEvento
    },
    resetPasswordContinua: {
        screen: resetPasswordContinua
    }
}

const AccountStack = createStackNavigator(screens, {
    headerMode: 'none', // Imposta questa opzione per nascondere l'header
    //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS


  });
  
export default createAppContainer(AccountStack);