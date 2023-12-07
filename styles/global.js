import { StyleSheet, Dimensions } from "react-native";

var widthScreen = Dimensions.get('window').width; //full width
var heightScreen = Dimensions.get('window').height; //full height
var buttonsHeight = 45;
var buttonsWidth = widthScreen-40;

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    LogoContainer: {
      display: 'flex',
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    LoginContainer: {
      display: 'flex',
      flex: 8,
      alignItems: 'center',
      borderRadius: 40,
      backgroundColor: '#FFF',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    ButtonContainer: {
      display: 'flex',
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 10,
    },
    FormContainer: {
      display: 'flex',
      flex: 8,
      alignItems: 'center',
      paddingTop: 20,
    },
    tinyLogo: {
      width: 100,
      height: 100,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#062F76',
      width: buttonsWidth,
      height: buttonsHeight,
      borderRadius: 30,
    },
    whiteText: {
      color: 'white',
    },
    input: {
      width: buttonsWidth,
      height: buttonsHeight,
      textAlign: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 30,
      marginTop: 15,
      marginBottom: 15,
      padding: 15,
    },
    infoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: buttonsWidth,
      height: buttonsHeight,
      borderRadius: 30,
      marginTop: 15,
      marginBottom: 15,
    },
    forgotButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: buttonsWidth/3*2,
      height: buttonsHeight/3*2,
      borderColor: '#062F76',
      borderWidth: 1,   
      borderRadius: 30,
    },
    viewImmagineCopertina: {
      width: widthScreen,
      height: widthScreen*2/3.2 + 10,
    },
    immagineCopertina: {
      // remove width and height to override fixed static size
      width: widthScreen,
      height: widthScreen*2/3.2,
      justifyContent: 'center',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      overflow: "hidden",
      paddingTop: 10,
    },
    ombra: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    ombraBottoneBlu: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    bottoniCopertinaEvento: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 2,
      paddingTop: 55,
      paddingLeft: 30,
      paddingRight: 30
    },
    titoloCopertinaEvento: {
      marginTop: -20,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 6,
    },
    dettagliCopertinaEvento: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 2,
    },
    nomeEvento: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold'
    },
    condividiEvento: {
      width: 30,
      height: 30,
    },
    panoramicaEvento: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'
    }
  });